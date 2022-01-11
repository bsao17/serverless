import React, {useState} from "react";
import {Link} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";

// CSS in JS
const navigationBar = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#282c34",
}
const link = {
    textDecoration: "none",
    color: "#fff",
    fontSize: "1.5rem"
}

export default function Navigation() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [photo, setPhoto] = useState("")
    const [userConnected, setUserConnected] = useState(false)

    // change auth status user listener
    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            const uid = user.uid;
            setPhoto(user.photoURL)
            setUserConnected(emailVerified)
        }
    });

    return (
        <div style={navigationBar}>
            <Link style={link} to={"/"}>Home</Link>
            <Link style={link} to={"/store"}>Chat</Link>
            {userConnected ? (
                    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                        <h1 style={{color: "green", marginRight: 20}}>
                            <i className="fas fa-user"/>
                        </h1>
                        <img style={{borderRadius: "50%", width: "30%", height: "30%"}} src={`${photo}`} alt=""/>
                    </div>) :
                <h1 style={{color: "red"}}><i className="fas fa-user-slash"/></h1>}
        </div>
    )
}