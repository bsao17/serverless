import React from "react";
import "../../App.scss"
import styleChat from "./chat.module.scss"


export default function Chat(){
    return(
        <div className={styleChat.chatHeader}>
            <div className="card card-body w-100 d-flex align-items-end justify-content-end">
                <div className={"w-100"} style={styleChat.form}>
                    <form className={"form-group d-flex"}>
                        <label className={"me-3"} htmlFor="message">Message</label>
                        <input className={"form-control"} type="text"/>
                        <button className={"btn btn-success"}><i className="fas fa-caret-square-right"/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}