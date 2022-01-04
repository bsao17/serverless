import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {collection, addDoc} from "firebase/firestore";
import {firebaseConfig} from "./firebase/firebaseConfig";
const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore();

export default function FirestoreData() {
    async function writeData(coll) {
        try {
            const docRef = await addDoc(collection(db, coll), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <div>
            <button onClick={ writeData("users")}>Send Firestore</button>
        </div>
    )
}