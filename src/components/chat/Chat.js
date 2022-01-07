import React, {useEffect, useRef, useState} from "react";
import styleChat from "./chat.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {writingMessageAction} from "../../store/action/writingMessageAction";
import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore, collection, addDoc, getDoc, setDoc, doc, onSnapshot} from "firebase/firestore";
// import {getFirestore} from "firebase/firestore";
import {firebaseConfig} from "../../firebase/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()
const messageReads = collection(db, "messages")
console.log(getDoc(doc(messageReads, "messages")))


export default function Chat() {
    const dispatch = useDispatch()
    const messageSelector = useSelector(state => state.post)
    const ref = useRef("")
    const [userName, setUserName] = useState("")
    const [userPhoto, setUserPhoto] = useState("")
    const [userConnected, setUserConnected] = useState()
    const [messages, setMessages] = useState()

    // database Storage
    async function addPost(message) {
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                postAt: new Date().toLocaleDateString(),
                postBy: userName,
                messages: message
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            const uid = user.uid;
            setUserName(displayName)
            setUserPhoto(photoURL)
            setUserConnected(emailVerified)

        }
    });


    return <div className={styleChat.chatHeader}>
        <div className="card  rounded-3 w-100 d-flex flex-column align-items-center justify-content-end">
            <div className={"w-100 d-flex"} style={{height: "70vh"}}>
                <div
                    className={"card card-body me-2 mb-2 w-25 rounded-3 d-flex flex-column justify-content-evenly"}>Users:
                    {userConnected ? (
                        <section className={"d-flex flex-column align-items-center"}>
                            <img className={styleChat.userphoto} src={userPhoto} alt="Avatar"/>
                            <span className={styleChat.username}>{userName}</span>
                        </section>
                    ) : ""}
                </div>
                <div
                    className={"card card-body ms-2 mb-2 w-100 overflow-scroll rounded-3"}>{/*messageSelector*/ messages}</div>
            </div>
            <div className={"w-100"}>
                <form className={"form-group d-flex"}>
                    <input ref={ref} className={"form-control"} type="text" placeholder={"Votre message ici ..."}
                           disabled={!userConnected}/>
                    <button
                        className={"btn btn-success"}
                        onClick={(event) => {
                            event.preventDefault()
                            dispatch(writingMessageAction(ref.current.value))
                            addPost(ref.current.value)
                            ref.current.value = ""
                        }}
                    ><i className="fas fa-caret-square-right"/></button>
                </form>
            </div>
        </div>
    </div>
}