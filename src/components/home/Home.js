import React, {useState, useEffect} from "react";
import "../../App.scss"
import styleShow from "./showMessages.module.scss"
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase/firebaseConfig";
import { StyledFirebaseAuth, FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getAuth} from "firebase/auth";


const app = initializeApp(firebaseConfig)
const Auth = getAuth()

export default function Home() {
    const [isSignedIn, setIsSignedIn] = useState(false);

// Signin function
    const uiConfig = {
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/store',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    };

    // signout function
    function signout() {

    }


    return (
        <div className={"App-header"}>
            <div className={"card"}>
                <h1>Google Firestore Chat</h1>

                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={Auth} />

            </div>
        </div>
    )
}