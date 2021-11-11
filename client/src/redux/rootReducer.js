import { combineReducers } from "redux"
import { appReducer } from "./appReducer"
import { authReducer } from "./authReducer"
import { spaceReducer } from "./spaceReducer"
import { levelReducer } from "./levelReducer"
import { subscriptionReducer } from "./subscriptionReducer"


export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    space: spaceReducer,
    level: levelReducer,
    subscription: subscriptionReducer,
})