import React, {useState} from "react";
import {Link} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";


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
    const[photo, setPhoto] = useState("")
    const auth = getAuth();
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            setPhoto(user.photoURL)
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            const uid = user.uid;
        }
    });
    console.log(user)
    return (

        <div style={navigationBar}>
            <Link style={link} to={"/"}>Home</Link>
            <Link style={link} to={"/store"}>Store Data</Link>
            {user ? (
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