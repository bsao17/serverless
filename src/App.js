import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/home/Home";
import Chat from "./components/chat/Chat";

export default function App(){
    return(
        <div>
            <Navigation/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/store'} element={<Chat/>} />
            </Routes>
        </div>
    )
}