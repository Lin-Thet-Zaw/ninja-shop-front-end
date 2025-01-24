import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { filtersReducer } from "./Filter/Reducer";
import { adminOrderReducer } from "./Admin/Order/Reducer";


const rootReducers = combineReducers({
  auth: authReducer,
  products: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  filters: filtersReducer, // Add filters reducer here
  adminOrder:adminOrderReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
