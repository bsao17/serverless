import {ADD_MESSAGE} from "../action/writingMessageAction";
import { ADD_USER} from "../action/writingMessageAction";

const initialState = []

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                message: [...state, action.message]
            }
        case ADD_USER:
            return {
                ...state,
                user: [...state, action.user]
            }
        default:
            return state
    }
}