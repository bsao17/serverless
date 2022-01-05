import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ShowMessages from "./components/showMessages/ShowMessages";
import StoreData from "./components/StoreData";

export default function App(){
    return(
        <div>
            <Navigation/>
            <Routes>
                <Route path={'/'} element={<ShowMessages/>}/>
                <Route path={'/store'} element={<StoreData/>} />
            </Routes>
        </div>
    )
}