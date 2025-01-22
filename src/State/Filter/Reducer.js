import { FETCH_FILTERS_FAILURE, FETCH_FILTERS_REQUEST, FETCH_FILTERS_SUCCESS } from "./ActionType";

const initialState = {
    filters: [],
    singleFilter: [],
    loading: false,
    error: null,
  };
  
  export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FILTERS_REQUEST:
        return { ...state, loading: true };
      case FETCH_FILTERS_SUCCESS:
        return {
          ...state,
          filters: action.payload.filters,
          singleFilter: action.payload.singleFilter,
          loading: false,
        };
      case FETCH_FILTERS_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  