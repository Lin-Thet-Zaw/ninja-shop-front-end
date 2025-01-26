import {
  FORGET_PASSWORD_FAILUER,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILUER,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from "./ActionType";

const initialState = {
  isLoading: false,
  error: "",
  message: "",
};

export const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, error: "", isLoading: true, message: "" };
    case FORGET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return { ...state, error: "", isLoading: false, message: action.payload };
    case FORGET_PASSWORD_FAILUER:
    case RESET_PASSWORD_FAILUER:
      return { ...state, message: "", isLoading: false, error: action.payload };
    default:
      return state;
  }
};
