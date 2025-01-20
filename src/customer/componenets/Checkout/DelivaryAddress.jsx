import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Order/Action";

const DelivaryAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector((store) => store);
  const address = order.order?.shippingAddress || {};

  const handelSubmite = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("streetAddress"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zipCode"),
      mobile: data.get("mobile"),
    };
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
    console.log("address", address);
  };
  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            <AddressCard address={address} />
            <Button
              sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
              size="large"
              variant="contained"
            >
              Deliver Here
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handelSubmite}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress" // This matches the backend field
                    label="Address"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Pravince/Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode" // Ensure it matches "zipCode"
                    label="Zip / Postal Code"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="mobile"
                    name="mobile" // Ensure it matches "mobile"
                    label="Phone Number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{ mt: 2, py: 1.5, bgcolor: "#9155fd" }}
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DelivaryAddress;
