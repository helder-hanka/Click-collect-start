import { createStore, compose, combineReducers } from 'redux';
import { cart } from "./cart"
import { user } from "./user"

const reducer = combineReducers({ cart, user })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers()
    
)