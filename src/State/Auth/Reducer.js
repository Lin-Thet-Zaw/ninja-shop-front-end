import { GET_USER_FALIER, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FALIER, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FALIER, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState={
    user:null,
    isLoading:false,
    error:null,
    jwt:null
}

export const authReducer = (state=initialState,action) => {
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {...state, isLoading:true, errr:null}

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state, isLoading:false, error: null, jwt:action.payload}

        case GET_USER_SUCCESS:
            return {...state, isLoading:false, error:null, user:action.payload}
        
        case LOGIN_FALIER:
        case REGISTER_FALIER:
        case GET_USER_FALIER:
            return {...state, isLoading:false, error:null, error:action.payload}

        case LOGOUT:
            return {...initialState}
        default:
            return {state};

    }
}