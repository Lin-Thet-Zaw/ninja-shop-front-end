"use client";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import {
  Rating,
  Button,
  Grid,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";
import { Helmet } from "react-helmet";
import Footer from "../HomeSectionCarousel/Footer/Footer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  const handleAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize?.name || null };
    dispatch(addItemToCart(data));
    navigate("/cart/");
  };

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductById(data));
  }, [params.productId]);

  // Check if sizes are available
  const hasSizes = products.product?.sizes && products.product.sizes.length > 0;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Helmet>
        <title>Product Details - Ninja Shop</title>
        <meta
          name="description"
          content="Welcome to the homepage of our app."
        />
      </Helmet>
      <Box sx={{ padding: { xs: 2, sm: 3, md: 4 }, flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
          }}
        >
          {/* Image Gallery */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: 2,
                maxWidth: "100%",
                height: { xs: "300px", sm: "400px", md: "500px" },
              }}
            >
              <img
                src={products.product?.imageUrl}
                alt={products.product?.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Box>

          {/* Product Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {products.product?.brand}
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.6, mb: 2 }}>
              {products.product?.title}
            </Typography>

            {/* Price and Discount */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                  products.product?.discountedPrice
                )}
              </Typography>
              {products.product?.discountedPercent > 0 && (
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.6, textDecoration: "line-through" }}
                >
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                    products.product?.price
                  )}
                </Typography>
              )}
              {products.product?.discountedPercent > 0 && (
                <Typography
                  variant="body1"
                  sx={{ color: "green", fontWeight: "bold" }}
                >
                  {products.product?.discountedPercent}% off
                </Typography>
              )}
            </Box>

            {/* Reviews */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                5349 ratings
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                234 reviews
              </Typography>
            </Box>

            {/* Size Selection (Only show if sizes are available) */}
            {hasSizes && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Size
                </Typography>
                <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                  <Grid container spacing={2}>
                    {products.product.sizes.map((size) => (
                      <Grid item key={size.name}>
                        <Radio value={size}>
                          {({ checked }) => (
                            <Box
                              sx={{
                                padding: 2,
                                border: checked
                                  ? "2px solid #9155fd"
                                  : "1px solid #e0e0e0",
                                borderRadius: 1,
                                cursor: "pointer",
                                backgroundColor: checked ? "#f3e8ff" : "white",
                              }}
                            >
                              <Typography>{size.name}</Typography>
                            </Box>
                          )}
                        </Radio>
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </Box>
            )}

            {/* Add to Cart Button (Always enabled if no sizes are required) */}
            <Button
              onClick={handleAddToCart}
              variant="contained"
              disabled={hasSizes && !selectedSize} // Disable only if sizes are required and no size is selected
              sx={{
                width: "100%",
                py: 1.5,
                bgcolor: "#9155fd",
                "&:hover": { bgcolor: "#7e4ad6" },
              }}
            >
              Add to Cart
            </Button>

            {/* Product Description */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Details
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                {products.product?.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}