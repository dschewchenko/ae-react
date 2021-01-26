import {AnyAction} from "redux";

const initialState: UserState = {
    token: ""
}

export const LOGIN_USER = 'LOGIN_USER'

export default function userReducer(
    state: UserState = initialState,
    action: AnyAction) {
    let newState: Partial<UserState> = {}

    switch (action.type) {
        case LOGIN_USER: {
            newState = {token: action.token}
            break
        }
        default:
            return state
    }

    return Object.assign({}, state, newState)
}

export type UserState = {
    token: string
}
