import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const OrderDetails = () => {
  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
      {/* Delivery Address */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Delivery Address
        </Typography>
        <AddressCard />
      </Box>

      {/* Order Tracker */}
      <Box sx={{ mb: 4 }}>
        <OrderTracker activeStep={3} />
      </Box>

      {/* Order Items */}
      <Grid container spacing={3}>
        {[1, 1, 1, 1].map((_, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                p: 3,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Product Details */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  src="https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/2/12_4.jpg"
                  alt="Product"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Men Slim Mid Rise Black Jeans
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Color: Pink | Size: M
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Seller: Iner
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    $87,768
                  </Typography>
                </Box>
              </Box>

              {/* Rate and Review */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <StarBorderIcon sx={{ color: "primary.main", fontSize: 24 }} />
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                  Rate and Review Product
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderDetails;