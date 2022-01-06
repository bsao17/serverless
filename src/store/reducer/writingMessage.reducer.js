import {ADD_MESSAGE} from "../action/writingMessage.action";

export const WritingMessageReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                message: [...state, action.message]
            }
        default:
            return state
    }
}