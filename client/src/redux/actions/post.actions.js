import { showLoader, hideLoader } from './app.actions'
import {
    GET_POST,
    GET_POSTS,
} from '../types'


export function createPost(form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token, user } = getState().auth
            const res = await fetch('/api/posts', {
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

            window.location.href = `/${user.space.alias}`
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function deletePost(postId) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { user, token } = getState().auth
            const res = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
                headers: { 'authorization': `Bearer ${token}` }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }
            
            dispatch(getPosts({ space: user.space._id }))
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function getPosts(query) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const params = new URLSearchParams(query)
            const res = await fetch(`/api/posts?${params}`)
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }
            dispatch({ type: GET_POSTS, payload: json.posts })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}


export function getPost(postId) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch(`/api/posts/${postId}`, {
                headers: { 'authorization': `Bearer ${token}` }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }
            dispatch({ type: GET_POST, payload: json.post })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function updatePost(postId, form) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth
            const res = await fetch(`/api/posts/${postId}`, {
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
            dispatch({ type: GET_POST, payload: json.post })
            dispatch(hideLoader())
            alert('Success!')
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}
