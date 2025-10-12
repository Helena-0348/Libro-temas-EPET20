import { useEffect, useMemo, useRef, useState } from "react";
import {
  collection, addDoc, setDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, orderBy, where, limit, startAfter,
  getDocs, getDoc, serverTimestamp, arrayUnion, arrayRemove,
  writeBatch, runTransaction, increment
} from "firebase/firestore";
import { getCountFromServer } from "firebase/firestore"; // v9+
import { db } from "../firebase/firebase";

// --------- helpers ----------
function toLower(s) { return (s || "").trim().toLowerCase(); }
function normProfesor(data = {}) {
  const nombre = data.nombre ?? "";
  const apellido = data.apellido ?? "";
  const email = data.email ?? "";
  const nombreLower = toLower(nombre);
  const apellidoLower = toLower(apellido);
  const emailLower = toLower(email);

  // Para búsquedas por prefijo (startAt/endAt) conviene unificar en un solo campo:
  const apellidoNombreLower = `${apellidoLower} ${nombreLower}`.trim();

  // Keywords simples para contains/prefix (sin acentos avanzados): ENLAZA LOS DATOS
  const keywords = Array.from(
    new Set([
      nombreLower,
      apellidoLower,
      apellidoNombreLower,
      `${nombreLower} ${apellidoLower}`.trim()
    ])
  ).filter(Boolean);

  return {
    ...data,
    nombre,
    apellido,
    email,
    nombreLower,
    apellidoLower,
    emailLower,
    apellidoNombreLower,
    keywords
  };
}

// Construye una query flexible en base a filtros
function buildQuery(colRef, {
  activo,             // boolean | undefined
  materia,            // string | undefined (array-contains)
  division,           // string | undefined (array-contains)
  emailEquals,        // string | undefined
  createdFrom,        // Timestamp/Date | undefined
  createdTo,          // Timestamp/Date | undefined
  sortBy = "createdAt",
  sortDir = "desc",
  pageSize,           // number | undefined
  cursor,             // DocumentSnapshot | undefined (para paginar)
} = {}) {
  const clauses = [];

  // Filtros
  if (typeof activo === "boolean") clauses.push(where("activo", "==", activo));
  if (materia) clauses.push(where("materias", "array-contains", materia));
  if (division) clauses.push(where("divisiones", "array-contains", division));
  if (emailEquals) clauses.push(where("emailLower", "==", toLower(emailEquals)));
  if (createdFrom) clauses.push(where("createdAt", ">=", createdFrom));
  if (createdTo) clauses.push(where("createdAt", "<=", createdTo));

  // Orden
  clauses.push(orderBy(sortBy, sortDir));

  // Paginación
  if (pageSize) clauses.push(limit(pageSize));
  if (cursor) clauses.push(startAfter(cursor));

  return query(colRef, ...clauses);
}

export function useProfesores() {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Para paginación
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  // Suscripción actual (para poder desmontar al cambiar filtros)
  const unsubRef = useRef(null);

  const colRef = useMemo(() => collection(db, "profesores"), []);

  // ------- LISTADO EN TIEMPO REAL (con filtros básicos) -------
  // Llama a listen({ filtros... }) cuando quieras escuchar en vivo.
  function listen({
    activo,
    materia,
    division,
    sortBy = "createdAt",
    sortDir = "desc",
    pageSize = 25,
  } = {}) {
    // cortar subs anterior
    if (unsubRef.current) {
      unsubRef.current();
      unsubRef.current = null;
    }
    setCargando(true);
    setError(null);

    const q = buildQuery(colRef, { activo, materia, division, sortBy, sortDir, pageSize });
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(rows);
      setCargando(false);
      setLastDoc(snap.docs[snap.docs.length - 1] || null);
      setHasMore(snap.size === pageSize);
    }, (err) => {
      setError(err);
      setCargando(false);
    });

    unsubRef.current = unsub;
    return unsub;
  }

  // ------- FETCH UNA SOLA VEZ (con filtros y paginación) -------
  async function fetchOnce(opts = {}) {
    setCargando(true);
    setError(null);
    try {
      const q = buildQuery(colRef, opts);
      const snap = await getDocs(q);
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(rows);
      setLastDoc(snap.docs[snap.docs.length - 1] || null);
      setHasMore(!!opts.pageSize && snap.size === opts.pageSize);
    } catch (e) {
      setError(e);
    } finally {
      setCargando(false);
    }
  }

  async function fetchNextPage(opts = {}) {
    if (!hasMore || !lastDoc) return;
    setCargando(true);
    setError(null);
    try {
      const q = buildQuery(colRef, { ...opts, cursor: lastDoc });
      const snap = await getDocs(q);
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems((prev) => [...prev, ...rows]);
      setLastDoc(snap.docs[snap.docs.length - 1] || null);
      setHasMore(!!opts.pageSize && snap.size === opts.pageSize);
    } catch (e) {
      setError(e);
    } finally {
      setCargando(false);
    }
  }

  // ------- OBTENER POR ID -------
  async function getById(id) {
    const ref = doc(db, "profesores", id);
    const d = await getDoc(ref);
    return d.exists() ? { id: d.id, ...d.data() } : null;
  }

  // ------- SUSCRIBIRSE A UN DOC -------
  function listenById(id, cb, errCb) {
    const ref = doc(db, "profesores", id);
    return onSnapshot(ref, (d) => {
      cb(d.exists() ? { id: d.id, ...d.data() } : null);
    }, errCb);
  }

  // ------- BUSCAR POR EMAIL EXACTO -------
  async function findByEmail(email) {
    const q = query(colRef, where("emailLower", "==", toLower(email)), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  }

  // ------- BÚSQUEDA POR PREFIJO (apellido + nombre) -------
  // Requiere el campo "apellidoNombreLower" y ordenar por ese campo
  async function searchByNombreApellido(prefix, pageSize = 25, cursor) {
    const p = toLower(prefix);
    const qBase = query(
      colRef,
      orderBy("apellidoNombreLower"),
      // startAt y endAt con el truco del último char alto:
      // '\uf8ff' cubre todos los strings que comienzan con p
      ...(!cursor ? [limit(pageSize), startAfter()] : []),
    );
    // Firestore no soporta dinámico endAt en la misma API con string literal y prefijo fácilmente,
    // así que estrategia alternativa: almacenar keywords y usar filtro client-side.
    // Implementación práctica: descargamos lote chico y filtramos en front.
    const snap = await getDocs(qBase);
    const rows = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((r) => (r.apellidoNombreLower || "").startsWith(p));
    return rows;
  }

  // ------- CONTEOS (total / activos) -------
  async function countAll({ activo } = {}) {
    const base = [];
    if (typeof activo === "boolean") base.push(where("activo", "==", activo));
    const qCount = query(colRef, ...base);
    const res = await getCountFromServer(qCount);
    return res.data().count;
  }

  // ------- ALTAS / EDICIONES / BAJAS -------
  async function crearProfesor(data) {
    const payload = {
      activo: true,
      ...normProfesor(data),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDoc(colRef, payload);
  }

  // Crear con ID propio (opcional)
  async function crearProfesorConId(id, data) {
    const ref = doc(db, "profesores", id);
    const payload = {
      activo: true,
      ...normProfesor(data),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, payload);
  }

  async function actualizarProfesor(id, data) {
    const ref = doc(db, "profesores", id);
    const payload = { ...normProfesor(data), updatedAt: serverTimestamp() };
    await updateDoc(ref, payload);
  }

  async function eliminarProfesor(id) {
    await deleteDoc(doc(db, "profesores", id));
  }

  // Borrado lógico
  async function desactivarProfesor(id) {
    await updateDoc(doc(db, "profesores", id), { activo: false, updatedAt: serverTimestamp() });
  }

  // ------- ARRAYS: materias / divisiones -------
  async function agregarMateria(id, materia) {
    await updateDoc(doc(db, "profesores", id), { materias: arrayUnion(materia), updatedAt: serverTimestamp() });
  }
  async function quitarMateria(id, materia) {
    await updateDoc(doc(db, "profesores", id), { materias: arrayRemove(materia), updatedAt: serverTimestamp() });
  }
  async function agregarDivision(id, division) {
    await updateDoc(doc(db, "profesores", id), { divisiones: arrayUnion(division), updatedAt: serverTimestamp() });
  }
  async function quitarDivision(id, division) {
    await updateDoc(doc(db, "profesores", id), { divisiones: arrayRemove(division), updatedAt: serverTimestamp() });
  }

  // ------- PAGINAR LISTAS MANUALES (fetch once) -------
  async function listarActivos({ pageSize = 25, cursor } = {}) {
    const qList = buildQuery(colRef, { activo: true, pageSize, cursor, sortBy: "createdAt", sortDir: "desc" });
    const snap = await getDocs(qList);
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { rows, nextCursor: snap.docs[snap.docs.length - 1] || null };
  }

  // ------- BATCH IMPORT -------
  async function importarProfesores(arrayDeProfesores = []) {
    const batch = writeBatch(db);
    arrayDeProfesores.forEach((p) => {
      const ref = doc(collection(db, "profesores"));
      batch.set(ref, {
        activo: true,
        ...normProfesor(p),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });
    await batch.commit();
  }

  // ------- PATRÓN SIMPLE DE UNICIDAD DE EMAIL (client-side) -------
  // Nota: Firestore no tiene restricciones únicas nativas. Esto previene duplicados "en la práctica".
  // Para 100% robustez, usar un doc espejo /profesores_emails/{emailLower} con transacción o un Cloud Function.
  async function crearSiEmailUnico(data) {
    const existente = await findByEmail(data.email);
    if (existente) throw new Error("Ya existe un profesor con ese email.");
    return crearProfesor(data);
  }

  // Variante más robusta (transacción con doc espejo):
  async function crearConEmailUnicoTransaccional(data) {
    const emailLower = toLower(data.email);
    const mirrorRef = doc(db, "profesores_emails", emailLower);
    const profRef = doc(collection(db, "profesores"));
    await runTransaction(db, async (tx) => {
      const mirrorSnap = await tx.get(mirrorRef);
      if (mirrorSnap.exists()) throw new Error("Email ya registrado.");
      tx.set(profRef, {
        activo: true,
        ...normProfesor(data),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      tx.set(mirrorRef, { profesorId: profRef.id, createdAt: serverTimestamp() });
    });
  }

  // ------- CAMPOS CONTADORES (ejemplo) -------
  async function incrementarCampo(id, campo = "cargas") {
    await updateDoc(doc(db, "profesores", id), { [campo]: increment(1), updatedAt: serverTimestamp() });
  }

  // Limpiar suscripción al desmontar
  useEffect(() => {
    return () => {
      if (unsubRef.current) unsubRef.current();
    };
  }, []);

  return {
    // estado
    items, cargando, error, hasMore, lastDoc,

    // tiempo real / fetch
    listen,
    fetchOnce,
    fetchNextPage,

    // CRUD
    crearProfesor,
    crearProfesorConId,
    crearSiEmailUnico,
    crearConEmailUnicoTransaccional,
    actualizarProfesor,
    eliminarProfesor,
    desactivarProfesor,

    // arrays
    agregarMateria, quitarMateria,
    agregarDivision, quitarDivision,

    // lecturas
    getById,
    listenById,
    findByEmail,
    searchByNombreApellido,
    countAll,
    listarActivos,

    // utilitarios
    importarProfesores,
    incrementarCampo,
  };
}