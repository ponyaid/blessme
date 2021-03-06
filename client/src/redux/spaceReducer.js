import { GET_SPACE, SET_IS_OWNER } from './types'


const initialState = {
    space: null,
    isOwner: false,
}

export const spaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPACE:
            return { ...state, space: action.payload }
        case SET_IS_OWNER:
            return { ...state, isOwner: action.payload }
        default:
            return state
    }
}