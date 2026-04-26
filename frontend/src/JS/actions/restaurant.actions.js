import apiClient from "../api/axiosConfig";
import {
  LOAD_RESTAURANTS,
  GET_ALL_RESTAURANTS,
  GET_ONE_RESTAURANT,
  FAIL_RESTAURANTS,
} from "../actionType/restaurant.actiontype";

export const getAllRestaurants = () => async (dispatch) => {
  dispatch({ type: LOAD_RESTAURANTS });
  try {
    const result = await apiClient.get("/api/restaurants");
    dispatch({ type: GET_ALL_RESTAURANTS, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_RESTAURANTS, payload: error.response?.data });
  }
};

export const getRestaurantById = (id) => async (dispatch) => {
  dispatch({ type: LOAD_RESTAURANTS });
  try {
    const result = await apiClient.get(`/api/restaurants/${id}`);
    dispatch({ type: GET_ONE_RESTAURANT, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_RESTAURANTS, payload: error.response?.data });
  }
};
