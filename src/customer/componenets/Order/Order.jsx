import { Grid, Box, Typography, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../State/Order/Action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const orderStatus = [
  { label: "On The Way", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Confirm", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "PENDING", value: "PENDING" },
];

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, orders } = useSelector((store) => store.order);
  const jwt = localStorage.getItem("jwt");
  const [selectedStatus, setSelectedStatus] = useState([]);

  if (auth?.user === null || jwt === null) {
    toast.info("Plase login");
    navigate("/");
  }

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleStatusChange = (value) => {
    if (selectedStatus.includes(value)) {
      setSelectedStatus(selectedStatus.filter((status) => status !== value));
    } else {
      setSelectedStatus([...selectedStatus, value]);
    }
  };

  const filteredOrders = orders?.filter((order) =>
    selectedStatus.length === 0
      ? true
      : selectedStatus.includes(order.orderStatus)
  );

  console.log("Filter orders", filteredOrders);

  return (
    <div>
      <Helmet>
        <title>Order Filter - Ninja Shop</title>
        <meta
          name="description"
          content="Welcome to the homepage of our app."
        />
      </Helmet>
      <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Filter Section */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                p: 3,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 3,
                position: { md: "sticky" },
                top: 16,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Filter
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Order Status
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {orderStatus.map((option) => (
                  <Box
                    key={option.value}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Checkbox
                      checked={selectedStatus.includes(option.value)}
                      onChange={() => handleStatusChange(option.value)}
                      sx={{ padding: 0, mr: 1 }}
                    />
                    <Typography variant="body2">{option.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Order Cards Section */}
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxHeight: "80vh", // Fixed height for scrollable container
                overflowY: "auto", // Enable vertical scrolling
                paddingRight: 2, // Add padding to avoid scrollbar overlap
              }}
            >
              {filteredOrders?.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Order;
