import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../index";
import {Action} from "redux";
import {LOGIN_USER} from "../reducers/user";

const API_KEY = process.env.REACT_APP_API_KEY

export function loginUser() {
    return async (dispatch: ThunkDispatch<AppState, void, Action>) => {
        try {
            const body = JSON.stringify({apiKey: API_KEY})
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
                body,
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
            const {token}: LoginResponse = await response.json()
            dispatch({type: LOGIN_USER, token})
        } catch (e) {
            throw new Error('Cannot login')
        }
    }
}

type LoginResponse = {
    token: string
}
