import { showLoader, hideLoader } from './app.actions'
import {
    GET_SPACE,
    UPDATE_USER,
    SET_IS_OWNER
} from '../types'


export function createSpace(form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch('/api/spaces/create', {
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
            dispatch({ type: UPDATE_USER, payload: json.user })
            dispatch(hideLoader())
            window.location.href = `/${json.space.alias}`
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
            const res = await fetch(`/api/spaces/${alias}`)
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            const { user } = getState().auth
            dispatch({ type: SET_IS_OWNER, payload: user?.space?.alias === alias })

            dispatch({ type: GET_SPACE, payload: json })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function uploadOne(alias, form, field) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token, user } = getState().auth

            const res = await fetch(`/api/spaces/${alias}/upload/${field}`, {
                body: form,
                method: 'POST',
                headers: { 'authorization': `Bearer ${token}` }
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: GET_SPACE, payload: json.space })
            dispatch({ type: UPDATE_USER, payload: { ...user, space: json.space } })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function updateGeneral(alias, form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token, user } = getState().auth

            const res = await fetch(`/api/spaces/${alias}/general`, {
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

            dispatch({ type: GET_SPACE, payload: json })
            dispatch({ type: UPDATE_USER, payload: { ...user, space: json } })
            dispatch(hideLoader())
            alert('Success!')
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function updateSocial(alias, form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token, user } = getState().auth
            const res = await fetch(`/api/spaces/${alias}/social`, {
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

            dispatch({ type: GET_SPACE, payload: json })
            dispatch({ type: UPDATE_USER, payload: { ...user, space: json } })
            dispatch(hideLoader())
            alert('Success!')
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}