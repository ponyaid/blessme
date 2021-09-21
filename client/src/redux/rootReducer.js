import { combineReducers } from "redux"
import { appReducer } from "./appReducer"
import { authReducer } from "./authReducer"
import { spaceReducer } from "./spaceReducer"


export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    space: spaceReducer,
})