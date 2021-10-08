import {
    LOGIN,
    LOGOUT,
    UPDATE_USER,
    SHOW_LOADER,
    HIDE_LOADER,
    GET_SPACE,
    SET_IS_OWNER,
    SET_IS_FOLLOWER
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
            dispatch({ type: GET_SPACE, payload: json.space })
            dispatch({ type: UPDATE_USER, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function getSpace(alias) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const res = await fetch(`/api/space/${alias}`)
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            const { user } = getState().auth

            dispatch({ type: SET_IS_FOLLOWER, payload: user?.following?.includes(json?._id) })
            dispatch({ type: SET_IS_OWNER, payload: user?.space?.alias === alias })

            dispatch({ type: GET_SPACE, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function followSpace(alias) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token, user } = getState().auth
            const res = await fetch(`/api/space/${alias}/follow`, {
                headers: { 'authorization': `Bearer ${token}` }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: SET_IS_FOLLOWER, payload: true })
            dispatch({ type: SET_IS_OWNER, payload: user?.space?.alias === alias })

            dispatch({ type: GET_SPACE, payload: json.space })
            dispatch({ type: UPDATE_USER, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function unfollowSpace(alias) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch(`/api/space/${alias}/unfollow`, {
                headers: { 'authorization': `Bearer ${token}` }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            const { user } = getState().auth

            dispatch({ type: SET_IS_FOLLOWER, payload: user?.following?.includes(json?._id) })
            dispatch({ type: SET_IS_OWNER, payload: user?.space?.alias === alias })
            dispatch({ type: GET_SPACE, payload: json.space })
            dispatch({ type: UPDATE_USER, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}