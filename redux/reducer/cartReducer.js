import { types } from "../../types/types";

const initialState = { cart: [] };

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case types.addItem:
      const helper = [...state.cart, action.payload];
      return { ...state, cart: helper };
    case types.listItem:
      return { ...state };
    default:
      return {};
  }
}
