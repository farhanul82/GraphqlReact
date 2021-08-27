import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Thunk from "redux-thunk";
import Reducer from "./Reducer/reducer";



const store = createStore(
  combineReducers({
    store: Reducer
  }),
  composeWithDevTools(applyMiddleware(Thunk))
);
export default store;