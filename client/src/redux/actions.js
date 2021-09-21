import {
    LOGIN,
    LOGOUT,
    UPDATE_USER,
    SHOW_LOADER,
    HIDE_LOADER,
    CREATE_SPACE
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


export function createSpace(form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch('/api/space/create', {
                method: 'POST',
                body: JSON.stringify({ ...form }),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }
            dispatch({ type: CREATE_SPACE, payload: json })
            dispatch({ type: UPDATE_USER, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}