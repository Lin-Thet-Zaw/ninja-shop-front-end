import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Button, Box, Typography, Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { comfirmedOrder, getOrderById } from "../../../State/Order/Action";
import OrderCartItem from "../Order/OrderCartItem";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector((store) => store);
  const address = order.order?.shippingAddress || {};
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  console.log("Order ID:", orderId);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const comfirmedOrderHandler = () => {
    const orderData = { orderId, navigate };
    dispatch(comfirmedOrder(orderData));
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
      {/* Address Card */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
        }}
      >
        <AddressCard address={address} />
      </Box>

      {/* Order Items and Price Details */}
      <Grid container spacing={4}>
        {/* Order Items */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {order.order?.orderItemList.map((item, index) => (
              <OrderCartItem key={index} item={item} />
            ))}
          </Box>
        </Grid>

        {/* Price Details */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: { md: "sticky" },
              top: 16,
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#ffffff",
              maxHeight: { md: "calc(100vh - 150px)" }, // Adjust height as needed
              overflowY: "auto", // Enable vertical scrolling
              mb: 4, // Add margin to avoid footer overlap
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              PRICE DETAILS
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Price Breakdown */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Price</Typography>
                <Typography>${order.order?.totalPrice}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Discount</Typography>
                <Typography sx={{ color: "green" }}>
                  -${order.order?.discounted}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Delivery Charge</Typography>
                <Typography sx={{ color: "green" }}>FREE</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <Typography>Total Amount</Typography>
                <Typography sx={{ color: "green" }}>
                  ${order.order?.totalDiscountPrice}
                </Typography>
              </Box>
            </Box>

            {/* Confirm Order Button */}
            <Button
              // onClick={comfirmedOrderHandler}
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: "#9155fd",
                "&:hover": { bgcolor: "#7e4ad6" },
              }}
            >
              Your order is being reviewed
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderSummary;