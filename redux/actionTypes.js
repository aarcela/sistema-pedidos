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

export const emptyCart = () => {
  return async (dispatch, getState) => {
    return dispatch({
      type: types.emptyCart,
    });
  };
};

export const addUser = (user) => {
  return async (dispatch, getState) => {
    return dispatch({
      type: types.addUser,
      payload: user,
    });
  };
};

export const removeUser = () => {
  return async (dispatch, getState) => {
    return dispatch({
      type: types.removeItem,
      payload: [],
    });
  };
};
