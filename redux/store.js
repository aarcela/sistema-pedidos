import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { cartReducer } from "../redux/reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";
import thunk from "redux-thunk";

// let composeEnhancers = compose;
// if (typeof window !== "undefined") {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    // I require this only in dev environment
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({cart: cartReducer, user: userReducer})
export const store = createStore(
  reducers,
  // applyMiddleware(thunk)
  bindMiddleware([thunk])
  // composeEnhancers
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
