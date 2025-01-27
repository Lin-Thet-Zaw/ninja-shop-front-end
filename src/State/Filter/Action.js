import { api } from "../../config/apiConfig";
import { FETCH_FILTERS_REQUEST, FETCH_FILTERS_SUCCESS, FETCH_FILTERS_FAILURE } from "./ActionType";

export const fetchFilters = () => async (dispatch) => {
  dispatch({ type: FETCH_FILTERS_REQUEST });
  try {
    const { data } = await api.get("/api/products/all"); // API to fetch filters
    // Check if the data is an array before proceeding
    if (!Array.isArray(data)) {
      throw new Error("API response is not an array");
    }

    const filters = formatFilters(data); // Format filters for frontend
    dispatch({ type: FETCH_FILTERS_SUCCESS, payload: filters });
  } catch (error) {
    dispatch({ type: FETCH_FILTERS_FAILURE, payload: error.message });
  }
};

const formatFilters = (data) => {
  // Extract unique colors from all products
  const colors = [...new Set(data.map((product) => product.color))];
  
  // Extract unique discountedPercents from all products
  const discountedPercents = [...new Set(data.map((product) => product.discountedPercent))];

  // Extract unique categories from all products
  const categories = [...new Set(data.map((product) => product.category.name))];

  // Extract all sizes (flatten the sizes array across products)
  const sizes = [
    ...new Set(
      data.flatMap((product) =>
        product.sizes.map((size) => size.name)
      ),
    ),
  ];

  return {
    filters: [
      {
        id: "color",
        name: "Color",
        options: colors.map((color) => ({
          value: color.toLowerCase(),
          label: color.charAt(0).toUpperCase() + color.slice(1),
          checked: false,
        })),
      },
      {
        id: "category",
        name: "Category",
        options: categories.map((category) => ({
          value: category,
          label: category,
          checked: false,
        })),
      },
      {
        id: "size",
        name: "Size",
        options: sizes.map((size) => ({
          value: size.toLowerCase(), // Ensure it's in lowercase if needed
          label: size.toUpperCase(), // Size label in uppercase
          checked: false,
        })),
      },
    ],
    singleFilter: [
      {
        id: "discounted",
        name: "Discount Range",
        options: discountedPercents.map((discounted) => ({
          value: discounted,
          label: `${discounted}% above`,
        })),
      },
    ],
  };
};
