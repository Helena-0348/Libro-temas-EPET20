import{collection, getDocs} from "firebase/firestoe";

const col = collection (db, "preceptores");
const snap = await getDocs(col);
const data = snap.docs.map(d => ({id: d.id, ...d.data()}));
console.log(data);

const col = collection(db, "profesor");
const q = query(col, orderBy("id" , "asc"));
const snap = await getDocs(q);

const col = collection(db, "profesor");
const q = query(col, orderBy("nombre" , "asc"));
const snap = await getDocs(q);

const col = collection(db, "profesor");
const q = query(col, orderBy("apellido" , "asc"));
const snap = await getDocs(q);

const col = collection(db, "profesor");
const q = query(col, orderBy("materias" , "asc"));
const snap = await getDocs(q);