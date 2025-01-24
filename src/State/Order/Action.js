import { api, setAuthHeader } from "../../config/apiConfig";
import {
  COMFIRMED_ORDER_FAILUER,
  COMFIRMED_ORDER_REQUEST,
  COMFIRMED_ORDER_SUCCESS,
  CREATE_ORDER_FAILUER,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILUER,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDERS_FAILUAR,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header

  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post("/api/orders/", reqData.address);

    if (data.id) {
      reqData.navigate({ search: `step=2&order_id=${data.id}` });
    }

    console.log("create order - ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error ", error);
    dispatch({
      type: CREATE_ORDER_FAILUER,
      payload: error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header

  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log("get order by id", data);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("get order by id error ", error);
    dispatch({
      type: GET_ORDER_BY_ID_FAILUER,
      payload: error.message,
    });
  }
};

export const comfirmedOrder = (reqData) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  dispatch({ type: COMFIRMED_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/orders/${reqData.orderId}/comfirmed`);
    console.log("comfirmed order ", data);
    if (data.id) {
      reqData.navigate("/account/order");
    }
    dispatch({
      type: COMFIRMED_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("get order by id error ", error);
    dispatch({
      type: COMFIRMED_ORDER_FAILUER,
      payload: error.message,
    });
  }
};

export const getOrders = () => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const { data } = await api.get("/api/orders/user");
    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAILUAR,
      payload: error.message,
    });
  }
};
