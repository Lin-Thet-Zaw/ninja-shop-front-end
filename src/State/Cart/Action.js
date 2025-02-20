import { api, setAuthHeader } from "../../config/apiConfig";
import {
  ADD_ITEM_TO_CART_FAILUER,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART__ITEM_SUCCESS,
  GET_CART_ITEM_FAILUER,
  GET_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_FAILUER,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILUER,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const getCartItem = () => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header

  dispatch({ type: GET_CART_ITEM_REQUEST });
  try {
    const { data } = await api.get("/api/cart/");
    dispatch({ type: GET_CART__ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CART_ITEM_FAILUER, payload: error.message });
  }
};
export const addItemToCart = (reqData) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header

  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
    const { data } = await api.put("/api/cart/add", reqData);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILUER, payload: error.message });
  }
};

export const removeItemFromCart = (cartItemId) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.delete(`/api/cart_items/${cartItemId}`);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILUER, payload: error.message });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.put(
      `/api/cart_items/${reqData.cartItemId}/update`,
      reqData.data
    );
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILUER, payload: error.message });
  }
};
