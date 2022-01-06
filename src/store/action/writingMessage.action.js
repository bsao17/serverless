export const ADD_MESSAGE = "ADD_MESSAGE"

export const writingMessageAction = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}