import { showLoader, hideLoader } from './app.actions'
import {
    LOGIN,
    LOGOUT,
    UPDATE_USER
} from '../types'


export function register(form) {
    return async dispatch => {
        dispatch(showLoader())
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ ...form }),
                headers: { 'Content-Type': 'application/json' }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: LOGIN, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function login(form) {
    return async dispatch => {
        dispatch(showLoader())
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ ...form }),
                headers: { 'Content-Type': 'application/json' }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: LOGIN, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function logout() {
    return dispatch => dispatch({ type: LOGOUT })
}

export function updateUser(form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch(`/api/auth/update`, {
                method: 'POST',
                body: JSON.stringify({ ...form }),
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: UPDATE_USER, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}
export function uploadAvatar(form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch(`/api/auth/upload`, {
                body: form,
                method: 'POST',
                headers: { 'authorization': `Bearer ${token}` }
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: UPDATE_USER, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}