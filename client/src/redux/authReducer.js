import { isExpired } from 'react-jwt'
import { LOGIN, LOGOUT } from './types'


const initialState = {
    token: null,
    user: null
}

const storageName = 'authData'

const getAuthState = () => {
    try {
        const data = JSON.parse(localStorage.getItem(storageName))
        const isMyTokenExpired = isExpired(data.token)
        if (!isMyTokenExpired) {
            return data
        }
        localStorage.removeItem(storageName)
        return initialState
    } catch (error) {
        return initialState
    }
}

export const authReducer = (state = getAuthState(), action) => {
    switch (action.type) {
        case LOGIN:
            const { user, token } = action.payload
            localStorage.setItem(storageName, JSON.stringify({ user, token }))
            return { ...state, user, token }
        case LOGOUT:
            localStorage.removeItem(storageName)
            return { ...state, user: null, token: null }
        default:
            return state
    }

}