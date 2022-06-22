import { createStore, compose, applyMiddleware } from "redux";
import reducer from '../reducer/index';
import thunk from 'redux-thunk';

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null

const store = createStore(
	reducer,
  compose(
		applyMiddleware(thunk),
		devTools
	)  
);

export default store;
