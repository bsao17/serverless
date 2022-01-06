export const ADD_MESSAGE = "ADD_MESSAGE"
export const ADD_USER = "ADD_USER"

export const writingMessageAction = (post) => {
    return {
        type: ADD_MESSAGE,
        payload: post
    }
}

export const addUser = (user) => {
    return {
        type: ADD_USER,
        user
    }
}