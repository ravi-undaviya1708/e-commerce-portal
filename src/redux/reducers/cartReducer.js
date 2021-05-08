import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";

const initialState = {
  cartData: [],
};

export default function userData(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, { cartData: action.data }];

    default:
      return state;
  }
}
