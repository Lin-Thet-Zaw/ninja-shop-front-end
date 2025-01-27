import { toast } from "react-toastify";
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
    toast.success("Your order in review")
  } catch (error) {
    console.log("catch error ", error);
  
    let errorMessage = "An error occurred while creating the order.";
  
    if (error.response && error.response.data && error.response.data.errors) {
      // Extract validation errors from the response
      const validationErrors = error.response.data.errors.map(err => err.defaultMessage).join(", ");
      errorMessage = validationErrors;
    }else if (error.request) {
      errorMessage = "Network Error: Unable to connect to the server.";
    }
  
    dispatch({
      type: CREATE_ORDER_FAILUER,
      payload: errorMessage,
    });
    toast.error(errorMessage)
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header

  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log("get order by id", data);
    toast.success("Success!");
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";

    if (error.response) {
      console.log(error.response.data);

      // Check for the specific error message in the response
      if (error.response.data.message === "Query did not return a unique result: 2 results were returned") {
        errorMessage = "Duplicate data found. Please ensure the data is unique.";
      } else if (error.response.data.message === "Required header 'Authorization' is not present.") {
        errorMessage = "You are not logged in. Please log in.";
      } else {
        errorMessage = error.response.data.message || "Server Error occurred during registration.";
      }
    } else if (error.request) {
      errorMessage = "Network Error: Unable to connect to the server.";
    } else {
      errorMessage = error.message;
    }

    dispatch({
      type: GET_ORDER_BY_ID_FAILUER,
      payload: errorMessage,
    });

    // Display the error message in a toast
    toast.error(errorMessage);
  }
};

export const getOrderByTrackId = (trackId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${trackId}/track`);
    console.log("get order by track id", data);
    toast.success("Success!");
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";

    if (error.response) {
      console.log(error.response.data);

      // Check for the specific error message in the response
      if (error.response.data.message === "Query did not return a unique result: 2 results were returned") {
        errorMessage = "Duplicate data found. Please ensure the data is unique.";
      } else if (error.response.data.message === "Required header 'Authorization' is not present.") {
        errorMessage = "You are not logged in. Please log in.";
      } else if(error.response.data) {
        errorMessage = "Order Not Found";
      }
    } else if (error.request) {
      errorMessage = "Network Error: Unable to connect to the server.";
    } else {
      errorMessage = error.message;
    }

    dispatch({
      type: GET_ORDER_BY_ID_FAILUER,
      payload: errorMessage,
    });

    // Display the error message in a toast
    toast.error(errorMessage);
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
