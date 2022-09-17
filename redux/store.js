import { createStore, applyMiddleware } from "redux";
import { cartReducer } from "../redux/reducer/cartReducer";
import thunk from "redux-thunk";

export const store = createStore(
  cartReducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
