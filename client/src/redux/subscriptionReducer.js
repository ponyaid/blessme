import {
    GET_SUBSCRIPTION,
    GET_SUBSCRIPTIONS,
    GET_SUBSCRIBERS
} from './types'


const initialState = {
    subscribers: [],
    subscriptions: [],
    subscription: null,
}

export const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SUBSCRIPTION:
            return { ...state, subscription: action.payload }
        case GET_SUBSCRIPTIONS:
            return { ...state, subscriptions: action.payload }
        case GET_SUBSCRIBERS:
            return { ...state, subscribers: action.payload }
        default:
            return state
    }
}