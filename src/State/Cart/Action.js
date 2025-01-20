import { api } from "../../config/apiConfig"
import { ADD_ITEM_TO_CART_FAILUER, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART__ITEM_SUCCESS, GET_CART_ITEM_FAILUER, GET_CART_ITEM_REQUEST, REMOVE_CART_ITEM_FAILUER, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILUER, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"

export const getCartItem = () => async(dispatch)=>{
    dispatch({type:GET_CART_ITEM_REQUEST})
    try{
     const {data} = await api.get("/api/cart/")
     dispatch({type:GET_CART__ITEM_SUCCESS, payload:data})
     console.log(data);
    }catch(error){
     dispatch({type:GET_CART_ITEM_FAILUER, payload:error.message})
    }
}
export const addItemToCart = (reqData) => async(dispatch)=>{
   dispatch({type:ADD_ITEM_TO_CART_REQUEST})
   try{
    const {data} = await api.put("/api/cart/add",reqData)
    console.log("add item to cart", data);
    dispatch({type:ADD_ITEM_TO_CART_SUCCESS, payload:data})
   }catch(error){
    dispatch({type:ADD_ITEM_TO_CART_FAILUER, payload:error.message})
   }
}

export const removeItemFromCart = (cartItemId) => async(dispatch)=>{
    dispatch({type:REMOVE_CART_ITEM_REQUEST})
    try{
     const {data} = await api.delete(`/api/cart_items/${cartItemId}`)
     console.log("Delete cart item form cart", data)
     dispatch({type:REMOVE_CART_ITEM_SUCCESS, payload:cartItemId})
    }catch(error){
     dispatch({type:REMOVE_CART_ITEM_FAILUER, payload:error.message})
    }
 }

 export const updateCartItem = (reqData) => async(dispatch)=>{
    dispatch({type:UPDATE_CART_ITEM_REQUEST})
    try{
     const {data} = await api.put(`/api/cart_items/${reqData.cartItemId}/update`, reqData.data)
     dispatch({type:UPDATE_CART_ITEM_SUCCESS, payload:data})
    }catch(error){
     dispatch({type:UPDATE_CART_ITEM_FAILUER, payload:error.message})
    }
 }