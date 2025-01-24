import { ConstructionOutlined } from "@mui/icons-material";
import { api, setAuthHeader } from "../../config/apiConfig";
import {
  CREATE_PRODUCT_FAILUAR,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILUAR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
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
import { toast } from "react-toastify";

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
    console.log("Find product by id", data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILUER, payload: error.message });
  }
};

export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  try {
    const { data } = await api.get("/api/products/all");
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

export const createProduct = (product) => async(dispatch)=>{
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header
  
  dispatch({type: CREATE_PRODUCT_REQUEST});
  try{
    console.log(`Create product red,${product.data}`)
    const {data} = await api.post(`/api/admin/products/`, product.data)
    console.log("Create product data", data)
    dispatch({type: CREATE_PRODUCT_SUCCESS, payload:data})
    toast.success("Product Created Successfully")

  }catch(error) {
    let errorMessage = "An unknown error occurred.";

    if (error.response) {
      console.log(error.response.data);
    
      // Check for the specific error message in the response
      if (error.response.data.message === "Query did not return a unique result: 2 results were returned") {
        errorMessage = "Duplicate data found. Please ensure the data is unique.";
      } else {
        errorMessage = error.response.data.message || "Server Error occurred during registration.";
      }
    } else if (error.request) {
      errorMessage = "Network Error: Unable to connect to the server.";
    } else {
      errorMessage = error.message;
    }
    
    // Dispatch the failure action
    dispatch({ type: CREATE_PRODUCT_FAILUAR, payload: error.message });
    
    // Display the error message in a toast
    toast.error(`Error: ${errorMessage}`);
  }
}

export const deleteProduct = (productId) => async(dispatch)=>{
  
  const jwt = localStorage.getItem("jwt");
  setAuthHeader(jwt); // Add the Authorization header

  dispatch({type: DELETE_PRODUCT_REQUEST});
  try{
    
    const {data} = await api.delete(`/api/admin/products/${productId}/delete`)
    console.log(data)
    dispatch({type: DELETE_PRODUCT_SUCCESS, payload:productId})
    toast.success("Product deleted successfully")

  }catch(error) {
    let errorMessage = "An unknown error occurred.";

    if (error.response) {
      errorMessage = "This product has ordered to customers, you can't not delete" || "Server Error occurred during registration.";
    } else if (error.request) {
      errorMessage = "Network Error: Unable to connect to the server.";
    } else {
      errorMessage = error.message;
    }
    dispatch({type: DELETE_PRODUCT_FAILUAR, payload:error.message})
    toast.error(`Error: ${errorMessage}`)
  }
}
