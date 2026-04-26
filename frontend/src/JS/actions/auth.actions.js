import apiClient from "../api/axiosConfig";
import {
  CURRENT_AUTH,
  FAIL_AUTH,
  LOAD_AUTH,
  LOGOUT_AUTH,
  SUCCESS_AUTH,
} from "../actionType/auth.actiontype";

export const register = (newUser, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_AUTH });
  try {
    const result = await apiClient.post("/api/auth/register", newUser);
    dispatch({ type: SUCCESS_AUTH, payload: result.data.data });
    navigate("/profile");
  } catch (error) {
    dispatch({ type: FAIL_AUTH, payload: error.response?.data?.errors || [{ msg: "Erreur inconnue" }] });
  }
};

export const login = (user, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_AUTH });
  try {
    const result = await apiClient.post("/api/auth/login", user);
    dispatch({ type: SUCCESS_AUTH, payload: result.data.data });
    navigate("/profile");
  } catch (error) {
    dispatch({ type: FAIL_AUTH, payload: error.response?.data?.errors || [{ msg: "Erreur inconnue" }] });
  }
};

export const current = () => async (dispatch) => {
  dispatch({ type: LOAD_AUTH });
  try {
    const result = await apiClient.get("/api/auth/current");
    dispatch({ type: CURRENT_AUTH, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_AUTH, payload: error.response?.data?.errors || [{ msg: "Erreur inconnue" }] });
  }
};

export const logout = (navigate) => (dispatch) => {
  dispatch({ type: LOGOUT_AUTH });
  navigate("/");
};
