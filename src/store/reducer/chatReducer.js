import {ADD_MESSAGE} from "../action/writingMessageAction";
import { ADD_USER} from "../action/writingMessageAction";

let id = 1

const initialState = {message: []}


export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                post: [...state.message, action.payload]
            }
        default:
            return state
    }
}