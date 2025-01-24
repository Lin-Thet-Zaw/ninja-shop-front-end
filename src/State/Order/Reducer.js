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
  
  const initialState = {
    orders: [],
    order: null,
    loading: false,
    error: null,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
      case COMFIRMED_ORDER_REQUEST:
      case GET_ORDER_BY_ID_REQUEST:
      case GET_ORDERS_REQUEST:
        return { ...state, loading: true, error: null };
  
      case CREATE_ORDER_SUCCESS:
        return { ...state, loading: false, order: action.payload, error: null };
  
      case COMFIRMED_ORDER_SUCCESS:
      case GET_ORDER_BY_ID_SUCCESS:
        return { ...state, loading: false, order: action.payload, error: null };
  
      case GET_ORDERS_SUCCESS:
        return { ...state, loading: false, orders: action.payload, error: null };
  
      case CREATE_ORDER_FAILUER:
      case COMFIRMED_ORDER_FAILUER:
      case GET_ORDER_BY_ID_FAILUER:
      case GET_ORDERS_FAILUAR:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };