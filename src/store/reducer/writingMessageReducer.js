import {ADD_MESSAGE} from "../action/writingMessageAction";

const initialState = []

export const writingMessageReducer = (state = initialState, action) => {
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