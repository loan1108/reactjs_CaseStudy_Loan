import{createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga"; 
import rootReducer from "./reducers/rootReducer";
import productsSaga from "../redux_saga/productsSaga";

const sagaMiddleware = createSagaMiddleware(); 

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(productsSaga)


export default store;