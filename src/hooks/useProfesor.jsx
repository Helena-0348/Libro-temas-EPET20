// #1crear collecion 'mesa de examen' y cargar 3 documentos (nombre_materia - fehca - hora)
// #2hacer una consulta ('activo','==',true)
// #3 mostrar los resultados en una tabla (nombre,fecha, hora)

import { useEffect , useMemo, useRef, useState} from "react";
import{
    collection, addDoc , setDoc , updateDoc , deleteDoc, doc,
    onSnapshot,query orderBy, where, limit, startAfter,
    getDocs, getDoc, serverTimestamp, arrayUnion, arrayRemove,
    writeBeatch, runTransaction, increment
} from "firebase/firestore";

//import {getCountFromServer} from "firebase/firestore";

import{db} from "../firebase/firebase";


Function listenById(id, cb ,errCb ){
    const ref = doc(db, "profesores", id);
    return onSnapshot(ref, (d) => {
        cb (d.exists() ? {id: d.id, ...d.data()} : null);
    },errCb);
 }


//collection  crear collecion, adddoc equivalente a insert, setDoc comparativa , updatedoc actualiza documento, deletedoc elimina documento,doc creo documento
//onsnapshot es el select de sql, query es para filtrar , orderby orden de a z o z a, where filtra , 
// limit es para traer los que quieras 10 o 20 o asi , 
// start After es para buscar un dato ,
//  getdocs traer documentos,getdoc trae documento , 
// servertimesstamp en que momento se escribio el dato , 
// arrayunion es el inner join, arrayremove te trae todos los que estan afuera de las tablas , 
// runtransaction cuantas transsacciones hace  , increment aumentar el cantidad de documentos, writeBatch tarea

//const nombre = data.nombre ?? "";
//if (nombre != ""){
// data.nombre
// }else {
//    echo "vacio";
//}

// BASE NO RELACIONALES PRIMERO QUE ENTRO ES EL PRIMERO QUE SALE FIFO FIRST IN FIRST OUT

//SUSCRIBIRSE A UN DOC= escuhar el id saber si existe mando update y sino manda error 

