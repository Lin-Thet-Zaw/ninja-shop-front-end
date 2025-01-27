import { Box, Step, StepLabel, Stepper, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByTrackId } from "../../../State/Order/Action";

const OrderTracker = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store); // Access order from Redux store
  const [activeStep, setActiveStep] = useState(0); // Track active step in stepper
  const [inputOrderTrackId, setInputOrderTrackId] = useState(""); // Track user input for orderId
  
  // Use React.useMemo for the orderStatus array to avoid recreating it on every render.
  const orderStatus = React.useMemo(() => [
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Pending", value: "PENDING" },
    { label: "Placed", value: "PLACED" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
  ], []);

  // Fetch order details when inputOrderId changes
  useEffect(() => {
    if (inputOrderTrackId) {
      dispatch(getOrderByTrackId(inputOrderTrackId));
    }
  }, [inputOrderTrackId, dispatch]);

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
    setInputOrderTrackId(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputOrderTrackId) {
      dispatch(getOrderByTrackId(inputOrderTrackId));
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 4, p: 3 }}>
      {/* Input field for orderId */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, side-by-side on larger screens
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            label="Enter Order ID"
            variant="outlined"
            value={inputOrderTrackId}
            onChange={handleInputChange}
            fullWidth
            type="number"
            sx={{
              mb: { xs: 2, sm: 0 }, // Add margin on smaller screens
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!inputOrderTrackId}
            sx={{ width: { xs: "100%", sm: "auto" } }} // Make button full-width on small screens
          >
            Track Order
          </Button>
        </Box>
      </form>

      {/* Stepper to display order status */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: 3 }}>
        {orderStatus.map((status) => (
          <Step key={status.value}>
            <StepLabel sx={{ color: "#9155fd", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              {status.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderTracker;
