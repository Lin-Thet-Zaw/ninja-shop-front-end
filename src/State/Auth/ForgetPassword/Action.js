import { toast } from "react-toastify";
import { api } from "../../../config/apiConfig";
import { FORGET_PASSWORD_FAILUER, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILUER, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "./ActionType";

export const forgetPassword = (userData) => async (dispatch) => {
    dispatch({ type: FORGET_PASSWORD_REQUEST });
    try {
      const response = await api.post(`/auth/forget-password`, userData);
      console.log(response)
      dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: response.data });
      toast.success(response.data)
    } catch (error) {
      dispatch({ type: FORGET_PASSWORD_FAILUER, payload: error.message });
          let errorMessage = "An unknown error occurred.";

          if (error.message === "Request failed with status code 404") {
            errorMessage = "This email not exist!";
          }else if(error.status == 400 ){
            errorMessage = "Invalid Email";
          } else if (error.request) {
            errorMessage = "Network Error: Unable to connect to the server.";
          }else {
            errorMessage = error.message;
          }
          toast.error(errorMessage)
        }
  };


export const resetPassword = (userData) => async (dispatch) => {
    dispatch({type: RESET_PASSWORD_REQUEST})
    try{
        const response = await api.post(`/auth/reset-password`,userData)
        dispatch({type: RESET_PASSWORD_SUCCESS, payload: response.data})
        toast.success("Password reset successfully")
    }catch(error){
        dispatch({type: RESET_PASSWORD_FAILUER, payload: error.message})
        let errorMessage = "An unknown error occurred.";

        if (error.message === "Request failed with status code 404") {
          errorMessage = "This email not exist!";
        }else if(error.status == 400 ){
          errorMessage = "Invalid";
        } else if (error.request) {
          errorMessage = "Network Error: Unable to connect to the server.";
        }else {
          errorMessage = error.message;
        }
        toast.error(errorMessage)
    }
}