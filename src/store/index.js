import {createStore} from "redux";
import {writingMessageReducer} from "./reducer/writingMessageReducer";


export const store = createStore(writingMessageReducer)