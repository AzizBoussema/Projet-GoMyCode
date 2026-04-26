import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
} from "../actionType/cart.actiontype";

const loadCartFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartItems");
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch {
    return [];
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find(
        (item) => item.product._id === payload.product._id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product._id === payload.product._id
              ? { ...item, quantity: item.quantity + payload.quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, payload],
      };
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.product._id !== payload),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.product._id === payload.productId
            ? { ...item, quantity: payload.quantity }
            : item
        ),
      };
    case CLEAR_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};

export default cartReducer;
