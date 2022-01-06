import {createStore} from "redux";
import {chatReducer} from "./reducer/chatReducer";


export const store = createStore(chatReducer)