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

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: localStorage.getItem("jwt") || null, // Initialize jwt from localStorage
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("jwt", action.payload.jwt); // Save JWT to localStorage
      return { ...state, isLoading: false, error: null, jwt: action.payload.jwt, user: action.payload };

    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: action.payload };

    case LOGIN_FALIER:
    case REGISTER_FALIER:
    case GET_USER_FALIER:
      return { ...state, isLoading: false, error: action.payload };

    case LOGOUT:
      localStorage.removeItem("jwt"); // Clear JWT from localStorage
      return { ...initialState, jwt: null };

    default:
      return state;
  }
};
