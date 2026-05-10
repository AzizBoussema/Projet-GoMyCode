import {
  LOAD_ADMIN, FAIL_ADMIN,
  ADMIN_GET_USERS, ADMIN_TOGGLE_USER, ADMIN_DELETE_USER,
  ADMIN_GET_RESTAURANTS, ADMIN_VALIDATE_RESTAURANT,
  ADMIN_REJECT_RESTAURANT, ADMIN_DELETE_RESTAURANT,
} from "../actionType/admin.actiontype";

const initialState = {
  users: [],
  restaurants: [],
  isLoad: false,
  errors: null,
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_ADMIN:
      return { ...state, isLoad: true, errors: null };

    case FAIL_ADMIN:
      return { ...state, isLoad: false, errors: payload };

    // ---- USERS ----
    case ADMIN_GET_USERS:
      return { ...state, isLoad: false, users: payload };

    case ADMIN_TOGGLE_USER:
      return {
        ...state,
        isLoad: false,
        users: state.users.map((u) => u._id === payload._id ? payload : u),
      };

    case ADMIN_DELETE_USER:
      return {
        ...state,
        isLoad: false,
        users: state.users.filter((u) => u._id !== payload),
      };

    // ---- RESTAURANTS ----
    case ADMIN_GET_RESTAURANTS:
      return { ...state, isLoad: false, restaurants: payload };

    case ADMIN_VALIDATE_RESTAURANT:
    case ADMIN_REJECT_RESTAURANT:
      return {
        ...state,
        isLoad: false,
        restaurants: state.restaurants.map((r) =>
          r._id === payload._id ? payload : r
        ),
      };

    case ADMIN_DELETE_RESTAURANT:
      return {
        ...state,
        isLoad: false,
        restaurants: state.restaurants.filter((r) => r._id !== payload),
      };

    default:
      return state;
  }
};

export default adminReducer;
