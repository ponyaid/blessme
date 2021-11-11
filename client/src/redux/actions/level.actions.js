import { showLoader, hideLoader } from './app.actions'
import {
    GET_LEVEL,
    GET_LEVELS,
} from '../types'


export function createLevel(form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch('/api/levels/create', {
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
            window.location.href = `/levels/${json.level._id}`
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function deleteLevel(levelId) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch(`/api/levels/${levelId}`, {
                method: 'DELETE',
                headers: { 'authorization': `Bearer ${token}` }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }
            dispatch(getLevelsByOwner())
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function getLevelsBySpace(spaceId) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const res = await fetch(`/api/levels?space=${spaceId}`)
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }
            dispatch({ type: GET_LEVELS, payload: json.levels })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function getLevelsByOwner() {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { user } = getState().auth

            const res = await fetch(`/api/levels?owner=${user._id}`)
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }
            dispatch({ type: GET_LEVELS, payload: json.levels })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function getLevel(levelId) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch(`/api/levels/${levelId}`, {
                headers: { 'authorization': `Bearer ${token}` }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }
            dispatch({ type: GET_LEVEL, payload: json.level })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function updateLevel(levelId, form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch(`/api/levels/${levelId}`, {
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
            dispatch({ type: GET_LEVEL, payload: json.level })
            dispatch(hideLoader())
            alert('Success!')
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function uploadImage(id, form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch(`/api/levels/${id}/upload`, {
                body: form,
                method: 'POST',
                headers: { 'authorization': `Bearer ${token}` }
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: GET_LEVEL, payload: json.level })
            dispatch(hideLoader())
            alert('Success!')
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}