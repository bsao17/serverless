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
        signInFlow: 'popup',
        signInSuccessUrl: '/store',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
    };

    return (
        <div className={"App-header"}>
            <div className={"card"}>
                <h1>Google Firestore Chat</h1>

                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={Auth} />

            </div>
        </div>
    )
}