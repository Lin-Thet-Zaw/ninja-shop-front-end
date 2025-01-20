import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_USER_FALIER,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FALIER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FALIER,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const registerRequest = () => ({ type: REGISTER_REQUEST });
const reqisterSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailer = (error) => ({ type: REGISTER_FALIER, payload: error });

const jwt = localStorage.getItem("jwt");

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("user", user);
    dispatch(reqisterSuccess(user.jwt));
  } catch (error) {
    dispatch(registerFailer(error.message));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailer = (error) => ({ type: LOGIN_FALIER, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("user", user);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailer(error.message));
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSucces = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailer = (error) => ({ type: GET_USER_FALIER, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());

  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    console.log("user", user);
    dispatch(getUserSucces(user));
  } catch (error) {
    dispatch(getUserFailer(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};
