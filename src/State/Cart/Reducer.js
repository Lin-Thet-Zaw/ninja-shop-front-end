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
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

const initialState = {
  cart: null,
  loading: false,
  error: null,
  cartItems: [],
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.cartItems],
        loading: false,
      };

    case ADD_ITEM_TO_CART_FAILUER:
      return { ...state, loading: false, error: action.payload };

    case GET_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_CART__ITEM_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cart: action.payload,
        loading: false,
      };

    case GET_CART_ITEM_FAILUER:
      return { ...state, loading: false, error: action.payload };

    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_FAILUER:
      return { ...state, loading: true, error: null };

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        deleteCartItem: action.payload,
        loading: false,
      };

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        updateCartItem: action.payload,
        loading: false,
      };
    
    case REMOVE_CART_ITEM_FAILUER:
    case UPDATE_CART_ITEM_FAILUER:
        return {...state,loading:false, error:action.payload};
    
    default:
        return state;
  }
};
