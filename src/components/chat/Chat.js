import React, {useEffect, useRef, useState} from "react";
import styleChat from "./chat.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {writingMessageAction} from "../../store/action/writingMessageAction";
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {addDoc, collection, getDocs, getFirestore} from "firebase/firestore";
import {firebaseConfig} from "../../firebase/firebaseConfig";


const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
console.log(firestore)
const auth = getAuth()


// Chat Component
export default function Chat(props) {
    const dispatch = useDispatch()
    // const messageSelector = useSelector(state => state.post)
    const ref = useRef("")
    const [userName, setUserName] = useState("")
    const [userPhoto, setUserPhoto] = useState("")
    const [userMail, setUserMail] = useState("")
    const [userConnected, setUserConnected] = useState()
    const [messageDb, setMessageDb] = useState([])

    const messageStore = collection(firestore, "messages")
    async function getPost(){
        const querySnapshot = await getDocs(messageStore)
        return querySnapshot.forEach((snap) => {
            setMessageDb([snap.data().messages])
            console.log(snap.data().messages)
        })
    }
    /*
    TODO implement request all message with real time method
     database Storage
    */
    async function addPost(newMessage) {
        try {
            const docRef = await addDoc(collection(firestore, "messages"), {
                postAt: new Date().toLocaleDateString(),
                postBy: userName,
                messages: newMessage
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
            setUserConnected(emailVerified)
            setUserName(displayName)
            setUserPhoto(photoURL)
            setUserMail(email)
        }
    });

    useEffect(getPost, [])


    return <div className={styleChat.chatHeader}>
        <div className=" w-100 d-flex flex-column align-items-center justify-content-end">
            <div className={"w-100 d-flex"} style={{height: "85vh"}}>
                <div
                    className={"card border me-1 mb-2 w-25 rounded-0 d-flex flex-column justify-content-evenly"}>Users:
                    {userConnected ? <section className={"d-flex flex-column align-items-center"}>
                            <img className={styleChat.userphoto} src={userPhoto} alt="Avatar"/>
                            <span className={styleChat.username}>{userName}</span>
                            <span className={styleChat.username}>{userMail}</span>
                        </section> : ""}
                </div>
                <div id={styleChat.screenMessages} className={"card border mb-2 w-100 text-dark overflow-scroll rounded-0"}>
                    <span className={styleChat.post}><img src={userPhoto} alt=""/> {messageDb.map((m)=>{return m})}</span>
                </div>
            </div>
            <div className={"w-100"}>
                <form className={"form-group d-flex"}>
                    <input ref={ref} className={"form-control"} type="text" placeholder={"Votre message ici ..."}
                           disabled={!userConnected}/>
                    <button
                        className={"btn btn-success"}
                        onClick={(event) => {
                            let refValue = ref.current.value
                            event.preventDefault()
                            dispatch(writingMessageAction(ref.current.value))
                            addPost(refValue)
                            refValue = (ref.current.value) = ""
                        }}
                    ><i className="fas fa-caret-square-right"/></button>
                </form>
            </div>
        </div>
    </div>
}