import {
  LOAD_RESTAURANTS,
  GET_ALL_RESTAURANTS,
  GET_ONE_RESTAURANT,
  FAIL_RESTAURANTS
} from "../actionType/restaurant.actiontype";

const initialState = {
  restaurants: [],
  restaurant: null,
  isLoad: false,
  error: null
};

const restaurantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_RESTAURANTS:
      return { ...state, isLoad: true };
    case GET_ALL_RESTAURANTS:
      return { ...state, isLoad: false, restaurants: payload };
    case GET_ONE_RESTAURANT:
      return { ...state, isLoad: false, restaurant: payload };
    case FAIL_RESTAURANTS:
      return { ...state, isLoad: false, error: payload };
    default:
      return state;
  }
};

export default restaurantReducer;
