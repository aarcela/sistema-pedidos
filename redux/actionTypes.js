import { types } from "../types/types";

export const listItem = (cart) => {
  return async (dispatch, getState) => {
    return dispatch({
      type: types.listItem,
      payload: cart,
    });
  };
};
