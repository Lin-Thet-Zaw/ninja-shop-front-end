import { api } from "../../config/apiConfig";
import { COMFIRMED_ORDER_FAILUER, COMFIRMED_ORDER_REQUEST, COMFIRMED_ORDER_SUCCESS, CREATE_ORDER_FAILUER, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILUER, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS } from "./ActionType"

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await api.post('/api/orders/', reqData.address);

        if (data.id) {
            reqData.navigate({ search: `step=2&order_id=${data.id}` });
        }

        console.log("create order - ", data);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log("catch error ", error);
        dispatch({
            type: CREATE_ORDER_FAILUER,
            payload: error.message,
        });
    }
};

export const getOrderById = (orderId) => async(disptach) => {
    disptach({type:GET_ORDER_BY_ID_REQUEST});
    try{
        const {data} = await api.get(`/api/orders/${orderId}`);
        console.log("get order by id", data);
        disptach({
            type:GET_ORDER_BY_ID_SUCCESS,
            payload:data
        })
    }catch(error) {
        console.log("get order by id error ", error);
        disptach({
            type:GET_ORDER_BY_ID_FAILUER,
            payload:error.message
        })
    }
}

export const comfirmedOrder = (reqData) => async(disptach) => {
    disptach({type:COMFIRMED_ORDER_REQUEST});
    try{
        const {data} = await api.put(`/api/orders/${reqData.orderId}/comfirmed`);
        console.log("comfirmed order ", data);
        if (data.id) {
            reqData.navigate("/account/order");
        }
        disptach({
            type:COMFIRMED_ORDER_SUCCESS,
            payload:data
        })
    }catch(error) {
        console.log("get order by id error ", error);
        disptach({
            type:COMFIRMED_ORDER_FAILUER,
            payload:error.message
        })
    }
}