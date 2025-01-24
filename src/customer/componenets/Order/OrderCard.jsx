import { Grid, Box, Typography, AvatarGroup, Avatar } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "success.main";
      case "SHIPPED":
        return "warning.main";
      case "CANCELLED":
        return "error.main";
      case "PENDING":
        return "info.main";
      default:
        return "text.secondary";
    }
  };


  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 3,
        "&:hover": { boxShadow: 5 },
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        {/* Product Image and Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AvatarGroup>
            {order.orderItemList.map((orderItem) => (
                     <Avatar src={orderItem.product.imageUrl}></Avatar>
            ))}
            </AvatarGroup>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {order.orderItemList.map((orderItem) => (
                      <p key={orderItem.id}>{orderItem.product.title}</p>
                ))}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Size: {order.orderItemList.map((orderItem) => (
                      <span key={orderItem.id}>{orderItem.size}</span>
                ))}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Color: {order.orderItemList.map((orderItem) => (
                      <span key={orderItem.id}>{orderItem.product.color}</span>
                ))}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Tracking Code: {order.id}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Price */}
        <Grid item xs={6} md={2}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            ${order.totalPrice}
          </Typography>
        </Grid>

        {/* Delivery Status */}
        <Grid item xs={6} md={4}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AdjustIcon sx={{ color: getStatusColor(order.orderStatus), fontSize: 16 }} />
            <Typography variant="body1">
              {order.orderStatus}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {order.orderStatus === "DELIVERED"
              ? `Delivered on ${new Date(order.deliveryDate).toLocaleDateString()}`
              : "Your item is on the way"}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;