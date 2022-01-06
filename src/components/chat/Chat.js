import React, {useRef} from "react";
import "../../App.scss"
import styleChat from "./chat.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {writingMessageAction} from "../../store/action/writingMessageAction";


export default function Chat(){
    const dispatch = useDispatch(null)
    const messageSelector = useSelector((state)=>{return state.message})
    const ref = useRef("")
    const value = ref.current.value
    return(
        <div className={styleChat.chatHeader}>
            <div className="card  rounded-3 w-100 d-flex flex-column align-items-center justify-content-end">
                <div className={"w-100 d-flex"} style={{height: "70vh"}}>
                    <div className={"card card-body me-2 mb-2 w-25 rounded-3"}>Users</div>
                    <div className={"card card-body ms-2 mb-2 w-100 overflow-scroll rounded-3"}>{messageSelector}</div>
                </div>
                <div className={"w-100"} style={styleChat.form}>
                    <form className={"form-group d-flex"}>
                        <input ref={ref} className={"form-control"} type="text" placeholder={"Votre message ici ..."}/>
                        <button
                            className={"btn btn-success"}
                            onClick={()=>{
                                dispatch(writingMessageAction(value))
                            }}
                        ><i className="fas fa-caret-square-right"/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}