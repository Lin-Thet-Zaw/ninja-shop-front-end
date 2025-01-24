import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Order/Action";

const DelivaryAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector((store) => store);
  const address = order.order?.shippingAddress || {};

  // State to track form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.streetAddress.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.zipCode.trim() !== "" &&
      formData.mobile.trim() !== ""
    );
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const orderData = { address: formData, navigate };
    dispatch(createOrder(orderData));
    console.log("address", formData);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto", // Enable vertical scrolling
          padding: "33px", // Add padding for better spacing
        }}
      >
        <Grid container spacing={4}>
          {/* Right Section (Address Form) */}
          <Grid item xs={12} lg={12}>
            <Box className="border rounded-s-md shadow-md p-5">
              <form onSubmit={handelSubmit}>
                <Grid container spacing={3}>
                  {/* First Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      fullWidth
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Last Name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      autoComplete="given-name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Street Address */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="streetAddress"
                      name="streetAddress"
                      label="Address"
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* City */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="City"
                      fullWidth
                      autoComplete="given-name"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* State */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="state"
                      name="state"
                      label="State/Province/Region"
                      fullWidth
                      autoComplete="given-name"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Zip Code */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="zipCode"
                      name="zipCode"
                      label="Zip / Postal Code"
                      fullWidth
                      type="number"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Phone Number */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="mobile"
                      name="mobile"
                      label="Phone Number"
                      fullWidth
                      type="number"
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      sx={{ mt: 2, py: 1.5, bgcolor: "#9155fd" }}
                      disabled={!isFormValid()} // Disable button if form is invalid
                    >
                      Deliver Here
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DelivaryAddress;