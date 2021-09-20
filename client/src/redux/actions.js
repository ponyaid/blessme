import {
    LOGIN,
    LOGOUT,
    SHOW_LOADER,
    HIDE_LOADER,
} from './types'


export function showLoader() {
    return { type: SHOW_LOADER }
}

export function hideLoader() {
    return { type: HIDE_LOADER }
}


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