import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from "redux"
import ProductReducer from "../Reducers/ProductReducer"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    products: ProductReducer
})
const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
        })
        : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),

);

const store = createStore(rootReducer, enhancer)


export default store