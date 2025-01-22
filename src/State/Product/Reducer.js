import { FIND_PRODUCT_BY_ID_FAILUER, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS__BY_CATEGORY_FAILUER, FIND_PRODUCTS_BY_CATEGORY_REQUEST, FIND_PRODUCTS_BY_CATEGORY_SUCCESS, FIND_PRODUCTS_FAILUER, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType"

const initialState = {
    products:[],
    product:null,
    loading:false,
    error:null
}

export const customerProductReducer = (state=initialState, action) => {
    switch(action.type){
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case FIND_PRODUCTS_BY_CATEGORY_REQUEST:
            return {...state, loading:true, error:null}
        case FIND_PRODUCTS_SUCCESS:
        case FIND_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {...state, loading:false, error:null, products:action.payload}
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {...state, loading:true, error:null, product:action.payload}
        case FIND_PRODUCTS_FAILUER:
        case FIND_PRODUCT_BY_ID_FAILUER:
        case FIND_PRODUCTS__BY_CATEGORY_FAILUER:
            return {...state, loading:false, error:action.payload}
        default:
            return state;
    }
}