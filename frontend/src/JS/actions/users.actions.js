import apiClient from "../api/axiosConfig";
import {
    DELETE_USER,
  FAIL_USER,
  GET_ALL_USERS,
  GET_ONE_USER,
  LOAD_USER,
  UPDATE_MY_PROFILE,
} from "../actionType/users.actiontype";
//get ALL
export const getUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await apiClient.get("/api/users/all");
    dispatch({ type: GET_ALL_USERS, payload: result.data.listUsers });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

//get One
export const getOneUser = (id) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await apiClient.get(`/api/users/${id}`);
    dispatch({ type: GET_ONE_USER, payload: result.data.user });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};
export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await apiClient.delete(`/api/users/${id}`);
    dispatch({ type: DELETE_USER, payload: result.data.user });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

// Update my profile
export const updateMyProfile = (profileData) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await apiClient.put("/api/users/profile/me", profileData);
    dispatch({ type: UPDATE_MY_PROFILE, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};