import React from "react";
import {Link} from "react-router-dom";

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
    return (
        <div style={navigationBar}>
            <Link style={link} to={"/"}>Home</Link>
            <Link style={link} to={"/store"}>Store Data</Link>
        </div>
    )
}