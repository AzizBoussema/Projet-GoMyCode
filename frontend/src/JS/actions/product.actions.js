import apiClient from "../api/axiosConfig";
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

export const getAllProducts = (restaurantId = null) => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const url = restaurantId
      ? `/api/products?restaurantId=${encodeURIComponent(restaurantId)}`
      : "/api/products";
    const result = await apiClient.get(url);
    dispatch({ type: GET_ALL_PRODUCTS, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error.response?.data });
  }
};

export const getOneProduct = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const result = await apiClient.get(`/api/products/${id}`);
    dispatch({ type: GET_ONE_PRODUCT, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error.response?.data });
  }
};

export const getProductsByRestaurant = (restaurantId) => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const result = await apiClient.get(`/api/products/restaurant/${restaurantId}`);
    dispatch({ type: GET_PRODUCTS_BY_RESTAURANT, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error.response?.data });
  }
};

export const getMyProducts = () => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const result = await apiClient.get("/api/products/vendor/my-products");
    dispatch({ type: GET_MY_PRODUCTS, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error.response?.data });
  }
};

export const addProduct = (newProduct, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const result = await apiClient.post("/api/products", newProduct);
    dispatch({ type: ADD_PRODUCT, payload: result.data.data });
    navigate("/vendor/dashboard");
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error.response?.data });
  }
};

export const updateProduct = (id, updatedProduct, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const result = await apiClient.put(`/api/products/${id}`, updatedProduct);
    dispatch({ type: UPDATE_PRODUCT, payload: result.data.data });
    navigate("/vendor/dashboard");
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error.response?.data });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    await apiClient.delete(`/api/products/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error.response?.data });
  }
};
