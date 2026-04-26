import {
  LOAD_ORDER,
  CREATE_ORDER,
  GET_MY_ORDERS,
  GET_VENDOR_ORDERS,
  UPDATE_ORDER_STATUS,
  FAIL_ORDER,
} from "../actionType/order.actiontype";

const initialState = {
  orders: [],
  order: {},
  isLoadOrder: false,
  errors: null,
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_ORDER:
      return { ...state, isLoadOrder: true };
    case CREATE_ORDER:
      return {
        ...state,
        isLoadOrder: false,
        orders: [payload, ...state.orders],
        errors: null,
      };
    case GET_MY_ORDERS:
      return { ...state, isLoadOrder: false, orders: payload, errors: null };
    case GET_VENDOR_ORDERS:
      return { ...state, isLoadOrder: false, orders: payload, errors: null };
    case UPDATE_ORDER_STATUS:
      return {
        ...state,
        isLoadOrder: false,
        orders: state.orders.map((order) =>
          order._id === payload._id ? payload : order
        ),
        errors: null,
      };
    case FAIL_ORDER:
      return { ...state, isLoadOrder: false, errors: payload };
    default:
      return state;
  }
};

export default orderReducer;