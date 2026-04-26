import {
  CURRENT_AUTH,
  FAIL_AUTH,
  LOAD_AUTH,
  LOGOUT_AUTH,
  SUCCESS_AUTH,
} from "../actionType/auth.actiontype";

const initialState = {
  isLoad: false,
  user: {},
  errors: null,
  success: null,
  isAuth: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_AUTH:
      return { ...state, isLoad: true };
    case SUCCESS_AUTH:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLoad: false,
        user: payload.user,
        success: payload.message || true,
        errors: null,
        isAuth: true,
      };
    case FAIL_AUTH:
      return { ...state, isLoad: false, errors: payload };
    case CURRENT_AUTH:
      return {
        ...state,
        isLoad: false,
        user: payload,
        errors: null,
        isAuth: true,
      };
    case LOGOUT_AUTH:
      localStorage.removeItem("token");
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
