import React from "react";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {collection, addDoc} from "firebase/firestore";
import {firebaseConfig} from "./firebase/firebaseConfig";

// only in case of connection breakage
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore();

// Style title
const title = {
    color: "white",
    fontWeight: "900"
}

export default function App() {
    // database Storage
    async function writeData(first, last, born) {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: first,
                last: last,
                born: born
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#508bb0"
        }}>
            <h1 style={title}>Using Google Firebase Firestore</h1>
            <button
                onClick={() => writeData("enzo", "Mehddeb", 2005)}
                style={{
                    width: "25%",
                    backgroundColor: "blue",
                    borderRadius: "15px",
                    color: "white",
                    fontSize: "1.2rem"
                }}
            >Send Firestore
            </button>
        </div>
    )
}