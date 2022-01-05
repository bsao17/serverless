import React, {useState} from "react";
import "../../App.scss"
import styleShow from "./showMessages.module.scss"
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {collection, addDoc} from "firebase/firestore";
import {firebaseConfig} from "../../firebase/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from "firebase/auth";

const db = initializeApp(firebaseConfig)

export default function ShowMessages() {
    const[userLogin, setUserLogin] =useState()
    function signin(){
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setUserLogin(user)
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    console.log(userLogin)
    function signout(){
        const auth = getAuth();
        signOut(auth).then(() => {

        }).catch((error) => {
            // An error happened.
        });
    }

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
                <h1 >Google Firestore Chat</h1>
                <button
                    onClick={signin}
                    className={styleShow.signin}
                >Signin
                </button>

                <button
                    onClick={()=>{
                        signout()
                    }}
                className={styleShow.signout}
                >Signout
                </button>
            </div>
        </div>
    )
}