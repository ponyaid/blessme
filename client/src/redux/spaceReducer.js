import { CREATE_SPACE } from './types'


const initialState = {
    space: null,
}

export const spaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SPACE:
            return { ...state, space: action.payload.space }
        default:
            return state
    }
}