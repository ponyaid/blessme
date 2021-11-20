import { GET_POST, GET_POSTS } from './types'


const initialState = {
    posts: [],
    post: null,
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST:
            return { ...state, post: action.payload }
        case GET_POSTS:
            return { ...state, posts: action.payload }
        default:
            return state
    }
}