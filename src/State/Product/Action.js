import { ConstructionOutlined } from "@mui/icons-material";
import { api } from "../../config/apiConfig";
import {
  FIND_PRODUCT_BY_ID_FAILUER,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS__BY_CATEGORY_FAILUER,
  FIND_PRODUCTS_BY_CATEGORY_REQUEST,
  FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
  FIND_PRODUCTS_FAILUER,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const {
    category,
    color,
    size,
    minPrice,
    maxPrice,
    minDiscounted,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const { data } = await api.get(
      `/api/products?category=${category}&color=${color}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscounted=${minDiscounted}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    console.log("Filter Product Data", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch({ type: FIND_PRODUCTS_FAILUER, payload: error.message });
  }
};

export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    console.log(data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILUER, payload: error.message });
  }
};

export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  try {
    const { data } = await api.get(`/api/products/all`);
    console.log("getAll products", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching all products:", error);
    dispatch({ type: FIND_PRODUCTS_FAILUER, payload: error.message });
  }
};

export const fetchProductsByCategory = (category) => {
  return async (dispatch) => {
    try {
      const data = await api.get(`/api/products/category?category=${category}`);
      dispatch({ type: FIND_PRODUCTS_BY_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FIND_PRODUCTS__BY_CATEGORY_FAILUER,
        error: error.message,
      });
    }
  };
};
