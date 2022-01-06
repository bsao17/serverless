import React, {useRef} from "react";
import styleChat from "./chat.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {writingMessageAction} from "../../store/action/writingMessageAction";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection, addDoc} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {firebaseConfig} from "../../firebase/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore()
const user = getAuth().currentUser
console.log(user)

export default function Chat() {
    const dispatch = useDispatch(null)
    const messageSelector = useSelector(state => state.post)
    const ref = useRef("")

    // database Storage
    async function postMessage(message) {
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                messages: message
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className={styleChat.chatHeader}>
            <div className="card  rounded-3 w-100 d-flex flex-column align-items-center justify-content-end">
                <div className={"w-100 d-flex"} style={{height: "70vh"}}>
                    <div className={"card card-body me-2 mb-2 w-25 rounded-3 d-flex flex-column justify-content-evenly"}>Users: <span className={"bg-light text-primary p-2 rounded-2"}>{user.displayName}</span></div>
                    <div className={"card card-body ms-2 mb-2 w-100 overflow-scroll rounded-3"}><img
                        className={"rounded-circle"} src={user.photoURL} alt="avatar"/> {messageSelector}</div>
                </div>
                <div className={"w-100"} style={styleChat.form}>
                    <form className={"form-group d-flex"}>
                        <input ref={ref} className={"form-control"} type="text" placeholder={"Votre message ici ..."}/>
                        <button
                            className={"btn btn-success"}
                            onClick={(event) => {
                                event.preventDefault()
                                dispatch(writingMessageAction(ref.current.value))
                                postMessage(ref.current.value)
                                ref.current.value = ""
                            }}
                        ><i className="fas fa-caret-square-right"/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}