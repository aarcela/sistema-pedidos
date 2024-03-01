import { types } from "../../types/types";

const initialState = { user: [] };

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.addUser:
      return { ...state, user: [action.payload] };

    case types.removeUser:
      return { ...state, user: [] };

    case types.listUser:
      return { ...state };

    default:
      return state;
  }
}
