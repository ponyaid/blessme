import { GET_LEVEL, GET_LEVELS } from './types'


const initialState = {
    levels: [],
    level: null,
}

export const levelReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEVEL:
            return { ...state, level: action.payload }
        case GET_LEVELS:
            return { ...state, levels: action.payload }
        default:
            return state
    }
}