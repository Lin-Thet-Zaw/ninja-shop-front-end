import { toast } from "react-toastify";
import { api, setAuthHeader } from "../../../config/apiConfig";
import {
  COMFIRMED_ORDER_FAILUER,
  COMFIRMED_ORDER_REQUEST,
} from "../../Order/ActionType";
import {
  ADMIN_GET_ORDERS_FAILUAR,
  ADMIN_GET_ORDERS_SUCCESS,
  CANCELED_ORDER_FAILUER,
  CANCELED_ORDER_REQUEST,
  CANCELED_ORDER_SUCCESS,
  COMFIREMD_ORDER_SUCCESS,
  DELETED_ORDER_FAILUER,
  DELETED_ORDER_REQUEST,
  DELETED_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILUER,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  SHIPED_ORDER_FAILUER,
  SHIPED_ORDER_REQUEST,
  SHIPED_ORDER_SUCCESS,
} from "./ActionType";

export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_GET_ORDERS_SUCCESS });
    try {
      const response = await api.get(`/api/admin/orders/`);
      dispatch({ type: ADMIN_GET_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: ADMIN_GET_ORDERS_FAILUAR, payload: error.message });
    }
  };
};

export const comfirmedOrder = (orderId) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  dispatch({ type: COMFIRMED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    const data = response.data;
    dispatch({ type: COMFIREMD_ORDER_SUCCESS, payload: data });
    toast.success("Order Confirmed Successfully");
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: COMFIRMED_ORDER_FAILUER, payload: error.message });
  }
};

export const shipOrder = (orderId) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  dispatch({ type: SHIPED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/ship`);
    const data = response.data;
    dispatch({ type: SHIPED_ORDER_SUCCESS, payload: data });
    toast.success("Order Shipped Successfully");
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: SHIPED_ORDER_FAILUER, payload: error.message });
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  dispatch({ type: DELIVERED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
    const data = response.data;
    dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
    toast.success("Order Delivered Successfully");
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: DELIVERED_ORDER_FAILUER, payload: error.message });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  dispatch({ type: CANCELED_ORDER_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
    const data = response.data;
    dispatch({ type: CANCELED_ORDER_SUCCESS, payload: data });
    toast.success("Order Cancelled Successfully");
  } catch (error) {
    dispatch({ type: CANCELED_ORDER_FAILUER, payload: error.message });
    toast.error(error.message);
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  dispatch({ type: DELETED_ORDER_REQUEST });
  try {
    const data = await api.delete(`/api/admin/orders/${orderId}/delete`);
    dispatch({ type: DELETED_ORDER_SUCCESS, payload: data });
    toast.success("Order Deleted Successfully");
  } catch (error) {
    dispatch({ type: DELETED_ORDER_FAILUER, payload: error.message });
    toast.error(error.message);
  }
};
