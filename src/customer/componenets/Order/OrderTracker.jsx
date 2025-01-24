import { Box, Step, StepLabel, Stepper, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";


const OrderTracker = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store); // Access order from Redux store
  const [activeStep, setActiveStep] = useState(0); // Track active step in stepper
  const [inputOrderId, setInputOrderId] = useState(""); // Track user input for orderId

  // Define order statuses
  const orderStatus = [
    { label: "Canclled", value: "CANCELLED" },
    { label: "Pending", value: "PENDING" },
    { label: "Placed", value: "PLACED" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
  ];

  // Fetch order details when inputOrderId changes
  useEffect(() => {
    if (inputOrderId) {
      dispatch(getOrderById(inputOrderId));
    }
  }, [inputOrderId, dispatch]);

  // Update activeStep when order status changes
  useEffect(() => {
    if (order.order?.orderStatus) {
      const statusIndex = orderStatus.findIndex(
        (status) => status.value === order.order.orderStatus
      );
      setActiveStep(statusIndex);
    }
  }, [order.order?.orderStatus, orderStatus]);

  // Handle user input for orderId
  const handleInputChange = (event) => {
    setInputOrderId(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputOrderId) {
      dispatch(getOrderById(inputOrderId));
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 4, p: 3 }}>
      {/* Input field for orderId */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <TextField
            label="Enter Order ID"
            variant="outlined"
            value={inputOrderId}
            onChange={handleInputChange}
            fullWidth
            type="number"
          />
          <Button type="submit" variant="contained" color="primary">
            Track Order
          </Button>
        </Box>
      </form>

      {/* Stepper to display order status */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {orderStatus.map((status) => (
          <Step key={status.value}>
            <StepLabel sx={{ color: "#9155fd", fontSize: "1rem" }}>
              {status.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderTracker;