import { createStore, applyMiddleware, compose } from "redux";
import { cartReducer } from "../redux/reducer/cartReducer";
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
export const store = createStore(
  cartReducer,
  // applyMiddleware(thunk)
  bindMiddleware([thunk])
  // composeEnhancers
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
