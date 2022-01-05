import React from "react";
import "../App.scss"
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {collection, addDoc} from "firebase/firestore";
import {firebaseConfig} from "../firebase/firebaseConfig";
import StoreData from "./StoreData";

// only in case of connection breakage
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore();

// Style title
const title = {
    color: "white",
    fontWeight: "900"
}

export default function ShowMessages() {
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
        <div className={"App-header"}>
            <div className={"card"}>
                <h1 style={title}>Google Firestore Chat</h1>
                <button
                    className={"App-logo"}
                    style={{
                        width: "35%",
                        backgroundColor: "blue",
                        border: "gray groove 2.5px",
                        borderRadius: "15px",
                        color: "white",
                        fontSize: "1.2rem",
                        marginBottom: 30
                    }}
                >Send Firestore
                </button>
            </div>
        </div>
    )
}