import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../State/Product/Action";
import {
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  Select,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { getUser } from "../../State/Auth/Action";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(store => store.products.loading);
  const jwt = localStorage.getItem("jwt");
  const { auth} = useSelector((store) => store);

  // Fetch user data using JWT
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt)); // Dispatch action to get user data
    } else{
      navigate("/")
    }
  }, [jwt, dispatch]);

  // Redirect if auth is invalid or user is not admin
  useEffect(() => {
    if (!auth || auth?.user?.role !== "admin") {
      navigate("/"); // Redirect to home if user is not admin
    }
  }, [auth,navigate]);

  // Default category dat
  const defaultCategories = {
    topLevelCategories: ["Woman", "Man", "Kids"],
    secondLevelCategories: ["Clothing", "Accessories", "Brands"],
    thirdLevelCategories: ["Tops", "Trending", "Best Sales"],
  };

  // State for product data
  const [productData, setProductData] = useState({
    image: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountedPercent: "",
    size: [{ name: "", quantity: 0 }], // Initialize with one size field
    quantity: "",
    topLevelCategory: "Woman",
    secondLevelCategory: "Clothing",
    thirdLevelCategory: "Best Sales",
    description: "",
  });

  // State for custom categories
  const [customCategories, setCustomCategories] = useState({
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateDescription = (description) => {
    return description.length >= 1 && description.length <= 500;
  };

  const validatePrice = (price) => {
    return price > 0;
  };

  const validateDiscountedPrice = (discountedPrice) => {
    return discountedPrice > 0;
  };

  const validateDiscountedPercent = (discountedPercent) => {
    return discountedPercent >= 0 && discountedPercent <= 100;
  };

  const validateQuantity = (quantity) => {
    return quantity >= 1;
  };

  const validateBrand = (brand) => {
    return brand.length >= 1 && brand.length <= 100;
  };

  const validateTitle = (title) => {
    return title.length >= 1 && title.length <= 200;
  };

  const validateColor = (color) => {
    return color.length >= 1 && color.length <= 100;
  };

  const validateSizes = (sizes) => {
    return (
      sizes.length > 0 && sizes.every((size) => size.name && size.quantity > 0)
    );
  };

  const validateImageUrl = (imageUrl) => {
    return imageUrl.length > 0;
  };

  const validateCategory = (category) => {
    return category.length >= 1 && category.length <= 100;
  };

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    switch (name) {
      case "description":
        isValid = validateDescription(value);
        break;
      case "price":
        isValid = validatePrice(value);
        break;
      case "discountedPrice":
        isValid = validateDiscountedPrice(value);
        break;
      case "discountedPercent":
        isValid = validateDiscountedPercent(value);
        break;
      case "quantity":
        isValid = validateQuantity(value);
        break;
      case "brand":
        isValid = validateBrand(value);
        break;
      case "color":
        isValid = validateColor(value);
        break;
      case "title":
        isValid = validateTitle(value);
        break;
      case "image":
        isValid = validateImageUrl(value);
        break;
      case "topLevelCategory":
      case "secondLevelCategory":
      case "thirdLevelCategory":
        isValid = validateCategory(value);
        break;
      default:
        break;
    }

    if (isValid) {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Invalid input for ${name}`,
      }));
    }
  };

  // Handle changes in custom category fields
  const handleCustomCategoryChange = (e) => {
    const { name, value } = e.target;
    setCustomCategories((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes in size fields
  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name === "size_quantity" ? "quantity" : "name"] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  // Add a new size field
  const addSizeField = () => {
    setProductData((prevState) => ({
      ...prevState,
      size: [...prevState.size, { name: "", quantity: 0 }],
    }));
  };

  // Remove a size field
  const removeSizeField = (index) => {
    const sizes = [...productData.size];
    sizes.splice(index, 1);
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  // Validate the form
  const isFormValid = () => {
    const {
      image,
      brand,
      title,
      color,
      discountedPrice,
      price,
      discountedPercent,
      quantity,
      description,
      size,
      topLevelCategory,
      secondLevelCategory,
      thirdLevelCategory,
    } = productData;

    return (
      validateDescription(description) &&
      validatePrice(price) &&
      validateDiscountedPrice(discountedPrice) &&
      validateDiscountedPercent(discountedPercent) &&
      validateQuantity(quantity) &&
      validateBrand(brand) &&
      validateColor(color) &&
      validateTitle(title) &&
      validateSizes(size) &&
      validateImageUrl(image) &&
      validateCategory(topLevelCategory) &&
      validateCategory(secondLevelCategory) &&
      validateCategory(thirdLevelCategory)
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const finalTopLevelCategory =
        customCategories.topLevelCategory || productData.topLevelCategory;
      const finalSecondLevelCategory =
        customCategories.secondLevelCategory || productData.secondLevelCategory;
      const finalThirdLevelCategory =
        customCategories.thirdLevelCategory || productData.thirdLevelCategory;

      const formData = new FormData();
      formData.append("image", productData.image);
      formData.append("brand", productData.brand);
      formData.append("title", productData.title);
      formData.append("color", productData.color);
      formData.append(
        "discountedPrice",
        parseFloat(productData.discountedPrice)
      );
      formData.append("price", parseFloat(productData.price));
      formData.append(
        "discountedPercent",
        parseInt(productData.discountedPercent, 10)
      );
      formData.append("quantity", parseInt(productData.quantity, 10));
      formData.append("topLevelCategory", finalTopLevelCategory);
      formData.append("secondLevelCategory", finalSecondLevelCategory);
      formData.append("thirdLevelCategory", finalThirdLevelCategory);
      formData.append("description", productData.description);
      formData.append("sizes", JSON.stringify(productData.size));

      dispatch(createProduct({ data: formData, jwt }));
    } else {
      toast.error("Please correct the errors in the form before submitting.");
    }
  };

  return (
    <div className="p-10">
      <Fragment>
        <Typography variant="h3" sx={{ textAlign: "center" }} className="py-15">
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit} className="min-h-screen">
          <Grid container spacing={2}>
            {/* Image URL */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={productData.image}
                onChange={handleChange}
                required
                error={!!errors.image}
                helperText={errors.image}
              />
            </Grid>

            {/* Brand */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                required
                error={!!errors.brand}
                helperText={errors.brand}
              />
            </Grid>

            {/* Title */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={productData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                required
              />
            </Grid>

            {/* Color */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={productData.color}
                onChange={handleChange}
                required
                error={!!errors.color}
                helperText={errors.color}
              />
            </Grid>

            {/* Quantity */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                type="number"
                required
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                type="number"
                required
                InputProps={{ step: "0.1" }}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>

            {/* Discounted Price */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discounted Price"
                name="discountedPrice"
                value={productData.discountedPrice}
                onChange={handleChange}
                type="number"
                InputProps={{ step: "0.1" }}
                required
                error={!!errors.discountedPrice}
                helperText={errors.discountedPrice}
              />
            </Grid>

            {/* Discounted Percentage */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discounted Percentage"
                name="discountedPercent"
                value={productData.discountedPercent}
                onChange={handleChange}
                type="number"
                required
                error={!!errors.discountedPercent}
                helperText={errors.discountedPercent}
              />
            </Grid>

            {/* Customizable Category Inputs */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Custom Top Level Category"
                name="topLevelCategory"
                value={customCategories.topLevelCategory}
                onChange={handleCustomCategoryChange}
                error={!!errors.topLevelCategory}
                helperText={errors.topLevelCategory}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Custom Second Level Category"
                name="secondLevelCategory"
                value={customCategories.secondLevelCategory}
                onChange={handleCustomCategoryChange}
                error={!!errors.secondLevelCategory}
                helperText={errors.secondLevelCategory}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Custom Third Level Category"
                name="thirdLevelCategory"
                value={customCategories.thirdLevelCategory}
                onChange={handleCustomCategoryChange}
                error={!!errors.thirdLevelCategory}
                helperText={errors.thirdLevelCategory}
              />
            </Grid>

            {/* Default Category Dropdowns */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Top Level Category</InputLabel>
                <Select
                  name="topLevelCategory"
                  value={productData.topLevelCategory}
                  onChange={handleChange}
                  label="Top Level Category"
                >
                  {defaultCategories.topLevelCategories.map(
                    (category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Second Level Category</InputLabel>
                <Select
                  name="secondLevelCategory"
                  value={productData.secondLevelCategory}
                  onChange={handleChange}
                  label="Second Level Category"
                >
                  {defaultCategories.secondLevelCategories.map(
                    (category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Third Level Category</InputLabel>
                <Select
                  name="thirdLevelCategory"
                  value={productData.thirdLevelCategory}
                  onChange={handleChange}
                  label="Third Level Category"
                >
                  {defaultCategories.thirdLevelCategories.map(
                    (category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                multiline
                required
                rows={3}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>

            {/* Dynamic Size Inputs */}
            {productData.size.map((size, index) => (
              <Grid container item spacing={3} key={index}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label="Size"
                    name="size"
                    value={size.name}
                    onChange={(event) => handleSizeChange(event, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label="Quantity"
                    name="size_quantity"
                    type="number"
                    value={size.quantity}
                    onChange={(event) => handleSizeChange(event, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton
                    onClick={() => removeSizeField(index)}
                    disabled={productData.size.length === 1}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            {/* Add New Size Button */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addSizeField}
              >
                Add Size
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ p: 1.8 }}
                className="py-20"
                size="large"
                type="submit"
                fullWidth
                disabled={!isFormValid()}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={24}
                      color="inherit"
                      sx={{ marginRight: 2 }}
                    />
                    Uploading...
                  </>
                ) : (
                  "Add New Product"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    </div>
  );
};

export default CreateProductForm;
