import { types } from "../../types/types";

const initialState = { cart: [] };

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case types.addItem:
      const checkCart = state.cart.find((element) => {
        if (element.CodArticulo === action.payload.CodArticulo) {
          return true;
        }
        return false;
      });
      if (!checkCart) {
        const helper = [...state.cart, action.payload];
        return { ...state, cart: helper };
      }
    case types.removeItem:
      let removeHelper = [...state.cart];
      removeHelper = state.cart.filter((element) => {
        return element.CodArticulo !== action.payload;
      });

      return { ...state, cart: removeHelper };
    case types.listItem:
      return { ...state };
    default:
      return state;
  }
}

//filter element array?
