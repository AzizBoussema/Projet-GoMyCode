import {
  LOAD_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_ONE_PRODUCT,
  GET_PRODUCTS_BY_RESTAURANT,
  GET_MY_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  FAIL_PRODUCTS,
} from "../actionType/product.actiontype";

const initialState = {
  products: [],
  product: {},
  restaurantProducts: [],
  myProducts: [],
  isLoad: false,
  error: null,
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS:
      return { ...state, isLoad: true };
    case GET_ALL_PRODUCTS:
      return { ...state, isLoad: false, products: payload, error: null };
    case GET_ONE_PRODUCT:
      return { ...state, isLoad: false, product: payload, error: null };
    case GET_PRODUCTS_BY_RESTAURANT:
      return { ...state, isLoad: false, restaurantProducts: payload, error: null };
    case GET_MY_PRODUCTS:
      return { ...state, isLoad: false, myProducts: payload, error: null };
    case ADD_PRODUCT:
      return {
        ...state,
        isLoad: false,
        myProducts: [payload, ...state.myProducts],
        products: [payload, ...state.products],
        error: null,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        isLoad: false,
        product: payload,
        myProducts: state.myProducts.map((item) => (item._id === payload._id ? payload : item)),
        products: state.products.map((item) => (item._id === payload._id ? payload : item)),
        restaurantProducts: state.restaurantProducts.map((item) => (item._id === payload._id ? payload : item)),
        error: null,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        isLoad: false,
        myProducts: state.myProducts.filter((item) => item._id !== payload),
        products: state.products.filter((item) => item._id !== payload),
        restaurantProducts: state.restaurantProducts.filter((item) => item._id !== payload),
        error: null,
      };
    case FAIL_PRODUCTS:
      return { ...state, isLoad: false, error: payload };
    default:
      return state;
  }
};

export default productReducer;
