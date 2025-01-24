import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
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
} from "@mui/material";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const initialSize = [
    { name: "L", quantity: 0 },
    { name: "M", quantity: 0 },
    { name: "S", quantity: 0 },
  ];

  const [productData, setProductData] = useState({
    image: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountedPercent: "",
    size: initialSize,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name === "size_quantity" ? "quantity" : "name"] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

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
      topLevelCategory,
      secondLevelCategory,
      thirdLevelCategory,
      description,
      size,
    } = productData;

    // Check if required fields are filled
    if (
      !image ||
      !brand ||
      !title ||
      !color ||
      !discountedPrice ||
      !price ||
      !discountedPercent ||
      !quantity ||
      !topLevelCategory ||
      !secondLevelCategory ||
      !thirdLevelCategory ||
      !description
    ) {
      return false;
    }

    // Check if all sizes have valid values
    const isSizeValid = size.every(
      (size) => size.name.trim() !== ""
    );

    return isSizeValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", productData.image);
    formData.append("brand", productData.brand);
    formData.append("title", productData.title);
    formData.append("color", productData.color);
    formData.append("discountedPrice", productData.discountedPrice);
    formData.append("price", productData.price);
    formData.append("discountedPercent", productData.discountedPercent);
    formData.append("quantity", productData.quantity);
    formData.append("topLevelCategory", productData.topLevelCategory);
    formData.append("secondLevelCategory", productData.secondLevelCategory);
    formData.append("thirdLevelCategory", productData.thirdLevelCategory);
    formData.append("description", productData.description);
    formData.append("size", JSON.stringify(productData.size));

    dispatch(createProduct({ data: formData, jwt }));
  };

  return (
    <div className="p-10">
      <Fragment>
        <Typography variant="h3" sx={{ textAlign: "center" }} className="py-15">
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit} className="min-h-screen">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={productData.image}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={productData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={productData.color}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discounted Price"
                name="discountedPrice"
                value={productData.discountedPrice}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discounted Percentage"
                name="discountedPercent"
                value={productData.discountedPercent}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Top Level Category</InputLabel>
                <Select
                  name="topLevelCategory"
                  value={productData.topLevelCategory}
                  onChange={handleChange}
                  label="Top Level Category"
                  required
                >
                  <MenuItem value="woman">Woman</MenuItem>
                  <MenuItem value="man">Man</MenuItem>
                  <MenuItem value="kids">Kids</MenuItem>
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
                  required
                >
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                  <MenuItem value="brands">Brands</MenuItem>
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
                  required
                >
                  <MenuItem value="top">Tops</MenuItem>
                  <MenuItem value="trending">Trending</MenuItem>
                  <MenuItem value="bestsales">Best Sales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
            </Grid>

            {productData.size.map((size, index) => (
              <Grid container item spacing={3} key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Size"
                    name="size"
                    value={size.name}
                    onChange={(event) => handleSizeChange(event, index)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    name="size_quantity"
                    type="number"
                    value={size.quantity}
                    onChange={(event) => handleSizeChange(event, index)}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ p: 1.8 }}
                className="py-20"
                size="large"
                type="submit"
                fullWidth
                disabled={!isFormValid()} // Disable button if form is invalid
              >
                Add New Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    </div>
  );
};

export default CreateProductForm;