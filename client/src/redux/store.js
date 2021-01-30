import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './Reducers/index'
const preLoadedState = {};
const middleware = [thunk];
const store = createStore(rootReducer, preLoadedState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
