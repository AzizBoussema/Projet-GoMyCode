import apiClient from "../api/axiosConfig";
import { clearCart } from "./cart.actions";
import {
  LOAD_ORDER,
  CREATE_ORDER,
  GET_MY_ORDERS,
  GET_VENDOR_ORDERS,
  UPDATE_ORDER_STATUS,
  FAIL_ORDER,
} from "../actionType/order.actiontype";

export const createOrder = (orderData, navigate, setIsOrdering, setShowModal) => async (dispatch) => {
  dispatch({ type: LOAD_ORDER });
  try {
    const result = await apiClient.post("/api/orders", orderData);
    dispatch({ type: CREATE_ORDER, payload: result.data.data });
    dispatch(clearCart());
    if (setIsOrdering) setIsOrdering(false);
    if (setShowModal) setShowModal(false);
    navigate("/order-confirmed", { state: { order: result.data.data } });
  } catch (error) {
    if (setIsOrdering) setIsOrdering(false);
    alert(error.response?.data?.errors?.[0]?.msg || "Erreur lors de la création de la commande.");
    dispatch({ type: FAIL_ORDER, payload: error.response?.data });
  }
};


export const getMyOrders = () => async (dispatch) => {
  dispatch({ type: LOAD_ORDER });
  try {
    const result = await apiClient.get("/api/orders/my-orders");
    dispatch({ type: GET_MY_ORDERS, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_ORDER, payload: error.response?.data });
  }
};

export const getVendorOrders = () => async (dispatch) => {
  dispatch({ type: LOAD_ORDER });
  try {
    const result = await apiClient.get("/api/orders/vendor/orders");
    dispatch({ type: GET_VENDOR_ORDERS, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_ORDER, payload: error.response?.data });
  }
};

export const updateOrderStatus = (id, status) => async (dispatch) => {
  dispatch({ type: LOAD_ORDER });
  try {
    const result = await apiClient.put(`/api/orders/${id}/status`, { status });
    dispatch({ type: UPDATE_ORDER_STATUS, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FAIL_ORDER, payload: error.response?.data });
  }
};
