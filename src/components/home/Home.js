import React, {useState} from "react";
import "../../App.scss"
import styleShow from "./showMessages.module.scss"
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase/firebaseConfig";
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";

const db = initializeApp(firebaseConfig)

export default function Home() {
// Signin function
    function signin() {
        const GoogleProvider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                const user = result.user;
            }).catch((error) => {
            console.log({
                errorCode: error.code,
                errorMessage: error.message
            })
        });
    }

    // signout function
    function signout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            alert("vous êtes déconnecté !")
        }).catch((error) => {
            console.log({error: error})
        });
    }


    return (
        <div className={"App-header"}>
            <div className={"card"}>
                <h1>Google Firestore Chat</h1>
                <button
                    onClick={signin}
                    className={styleShow.signin}
                >Signin
                </button>

                <button
                    onClick={signout}
                    className={styleShow.signout}
                >Signout
                </button>
            </div>
        </div>
    )
}