export const ADD_MESSAGE = "ADD_MESSAGE"
export const ADD_USER = "ADD_USER"

export const writingMessageAction = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}

export const addUser = (user) => {
    return {
        type: ADD_USER,
        user
    }
}