import { createStore, combineReducers } from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import productReducer from "./reducers/productReducer"
import filterReducer from "./reducers/filterReducer";
const rootReducer = combineReducers({
  productReducer,
  filterReducer
});
const store = createStore(rootReducer, composeWithDevTools());
console.log("store")
export default store;