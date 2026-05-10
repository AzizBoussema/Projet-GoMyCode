import apiClient from "../api/axiosConfig";
import {
  LOAD_ADMIN, FAIL_ADMIN,
  ADMIN_GET_USERS, ADMIN_TOGGLE_USER, ADMIN_DELETE_USER,
  ADMIN_GET_RESTAURANTS, ADMIN_VALIDATE_RESTAURANT,
  ADMIN_REJECT_RESTAURANT, ADMIN_DELETE_RESTAURANT,
} from "../actionType/admin.actiontype";

// ---- USERS ----
export const adminGetUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const res = await apiClient.get("/api/users/all");
    dispatch({ type: ADMIN_GET_USERS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response?.data?.errors });
  }
};

export const adminToggleUser = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const res = await apiClient.put(`/api/users/${id}/toggle-active`);
    dispatch({ type: ADMIN_TOGGLE_USER, payload: res.data.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response?.data?.errors });
  }
};

export const adminDeleteUser = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    await apiClient.delete(`/api/users/${id}`);
    dispatch({ type: ADMIN_DELETE_USER, payload: id });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response?.data?.errors });
  }
};

// ---- RESTAURANTS ----
export const adminGetRestaurants = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const res = await apiClient.get("/api/restaurants/admin/all");
    dispatch({ type: ADMIN_GET_RESTAURANTS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response?.data?.errors });
  }
};

export const adminValidateRestaurant = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const res = await apiClient.put(`/api/restaurants/admin/${id}/validate`);
    dispatch({ type: ADMIN_VALIDATE_RESTAURANT, payload: res.data.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response?.data?.errors });
  }
};

export const adminRejectRestaurant = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const res = await apiClient.put(`/api/restaurants/admin/${id}/reject`);
    dispatch({ type: ADMIN_REJECT_RESTAURANT, payload: res.data.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response?.data?.errors });
  }
};

export const adminDeleteRestaurant = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    await apiClient.delete(`/api/restaurants/admin/${id}`);
    dispatch({ type: ADMIN_DELETE_RESTAURANT, payload: id });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response?.data?.errors });
  }
};
