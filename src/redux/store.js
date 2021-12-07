// base store tools
import { createStore, applyMiddleware } from "redux";
// dev tool
import { composeWithDevTools } from "redux-devtools-extension";
// middleware
import thunk from "redux-thunk";
// reducer >> state
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
