import{collection, getDocs} from "firebase/firestoe";
import{query, orderBy, getDocs, collection} from "firebase/firestoe";

const col = collection (db, "dia");
const snap = await getDocs(col);
const data = snap.docs.map(d => ({id: d.id, ...d.data()}));
console.log(data);

const col = collection(db, "dia");
const q = query(col, orderBy("id" , "asc"));
const snap = await getDocs(q);

const col = collection(db, "dia");
const q = query(col, orderBy("fecha" , "asc"));
const snap = await getDocs(q);

const col = collection(db, "dia");
const q = query(col, orderBy("nClase" , "asc"));
const snap = await getDocs(q);

const col = collection(db, "dia");
const q = query(col, orderBy("unidad" , "asc"));
const snap = await getDocs(q);

const col = collection(db, "dia");
const q = query(col, orderBy("actividad" , "asc"));
const snap = await getDocs(q);

const col = collection(db, "dia");
const q = query(col, orderBy("siNo" , "asc"));
const snap = await getDocs(q);

const col = collection(db, "dia");
const q = query(col, orderBy("firma" , "asc"));
const snap = await getDocs(q);