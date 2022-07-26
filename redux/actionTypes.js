import { types } from "../types/types";

export const addItem = (cart) => {
  return async (dispatch, getState) => {
    return dispatch({
      type: types.addItem,
      payload: cart,
    });
  };
};
export const removeItem = (elementID) => {
  return async (dispatch, getState) => {
    return dispatch({
      type: types.removeItem,
      payload: elementID,
    });
  };
};
