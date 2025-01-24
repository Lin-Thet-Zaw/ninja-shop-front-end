import { COMFIRMED_ORDER_FAILUER, COMFIRMED_ORDER_REQUEST, GET_ORDERS_FAILUAR } from "../../Order/ActionType"
import { ADMIN_GET_ORDERS_REQUEST, ADMIN_GET_ORDERS_SUCCESS, CANCELED_ORDER_FAILUER, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCCESS, COMFIREMD_ORDER_SUCCESS, DELETED_ORDER_FAILUER, DELETED_ORDER_REQUEST, DELETED_ORDER_SUCCESS, DELIVERED_ORDER_FAILUER, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, SHIPED_ORDER_FAILUER, SHIPED_ORDER_REQUEST, SHIPED_ORDER_SUCCESS } from "./ActionType"

const initialState = {
    orders:[],
    loading:false,
    error:null,
    comfirmedOrder:null,
    shippedOrder:null,
    deliveredOrder:null,
    cancelledOrder:null,
    deletedOrder:null,
}

export const adminOrderReducer = (state = initialState, action) => {
    switch(action.type){
        case ADMIN_GET_ORDERS_REQUEST:
            return {...state, loading:true, error:null};
        case ADMIN_GET_ORDERS_SUCCESS:
            return {...state, loading:false, error:null, orders:action.payload};
        case GET_ORDERS_FAILUAR:
            return {...state, loading:false, error:action.payload};
        case COMFIRMED_ORDER_REQUEST:
        case SHIPED_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case CANCELED_ORDER_REQUEST:
        case DELETED_ORDER_REQUEST:
            return {...state, loading:true, error:null};
        case COMFIREMD_ORDER_SUCCESS:
            return {...state, loading:false, comfirmedOrder:action.payload, error:null};
        case SHIPED_ORDER_SUCCESS:
            return {...state, loading:false, shippedOrder:action.payload, error:null};
        case DELIVERED_ORDER_SUCCESS:
            return {...state, loading:false, deliveredOrder:action.payload, error:null};
        case CANCELED_ORDER_SUCCESS:
            return {...state, loading:false, cancelledOrder:action.payload, error:null};
        case DELETED_ORDER_SUCCESS:
            return {...state, loading:false, deletedOrder:action.payload, error:null};
        case COMFIRMED_ORDER_FAILUER:
        case SHIPED_ORDER_FAILUER:
        case DELIVERED_ORDER_FAILUER:
        case CANCELED_ORDER_FAILUER:
        case DELETED_ORDER_FAILUER:
            return {...state, loading:true, error:action.payload};
        default:
            return state; // Always return the current state for any unknown action
    }
};