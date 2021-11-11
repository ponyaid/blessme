import { showLoader, hideLoader } from './app.actions'
import {
    GET_SUBSCRIBERS,
    GET_SUBSCRIPTION,
    GET_SUBSCRIPTIONS
} from '../types'


export function subscribe(space, level) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth

            const res = await fetch(`/api/subscriptions`, {
                method: 'POST',
                body: JSON.stringify({ space, level }),
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: GET_SUBSCRIPTION, payload: json.subscription })
            dispatch(hideLoader())
            alert('Success!')
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function unsubscribe(subscriptionId) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth

            const res = await fetch(`/api/subscriptions/${subscriptionId}`, {
                method: 'DELETE',
                headers: { 'authorization': `Bearer ${token}` }
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: GET_SUBSCRIPTION, payload: null })
            dispatch(hideLoader())
            alert('Success!')
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}
export function updateSubscription(subscriptionId, body) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth

            const res = await fetch(`/api/subscriptions/${subscriptionId}`, {
                method: 'POST',
                body: JSON.stringify({ ...body }),
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: GET_SUBSCRIPTION, payload: json.subscription })
            dispatch(hideLoader())
            alert('Success!')
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function getSubscribers(space) {
    return async dispatch => {
        dispatch(showLoader())
        try {
            const res = await fetch(`/api/subscriptions/?space=${space}`)
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: GET_SUBSCRIBERS, payload: json.subscriptions })
            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function getSubscription(space) {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { user } = getState().auth

            if (user) {
                const res = await fetch(`/api/subscriptions/?space=${space}&user=${user._id}`)
                const json = await res.json()

                if (!res.ok) {
                    throw new Error(json.message)
                }

                dispatch({ type: GET_SUBSCRIPTION, payload: json.subscriptions[0] })
            }

            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}

export function getSubscriptions() {
    return async (dispatch, getState) => {
        dispatch(showLoader())
        try {
            const { token } = getState().auth

            const res = await fetch(`/api/subscriptions/populate`, {
                headers: { 'authorization': `Bearer ${token}`, }
            })
            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.message)
            }

            dispatch({ type: GET_SUBSCRIPTIONS, payload: json.subscriptions })

            dispatch(hideLoader())
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader())
        }
    }
}