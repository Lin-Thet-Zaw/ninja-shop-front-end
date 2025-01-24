import React, { useEffect } from "react";
import CartItems from "./CartItems";
import { Button, Box, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../../../State/Cart/Action";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);

  const handleCheckout = () => {
    navigate("/checkout?step=1");
  };

  if (auth?.user === null) {
    toast.info("Plase login");
    navigate("/");
  }

  useEffect(() => {
    dispatch(getCartItem());
  }, [cart.updateCartItem, cart.deleteCartItem]);

  return (
    <div>
      <Helmet>
        <title>Product to cart - Ninja Shop</title>
        <meta
          name="description"
          content="Welcome to the homepage of our app."
        />
      </Helmet>
      <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
          }}
        >
          {/* Cart Items Section */}
          <Box sx={{ flex: 2, overflowY: "auto", maxHeight: "80vh" }}>
            {cart.cart?.cartItems.map((item, index) => (
              <CartItems key={index} item={item} />
            ))}
          </Box>

          {/* Price Details Section */}
          <Box
            sx={{
              flex: 1,
              position: { xs: "static", lg: "sticky" },
              top: 16,
              height: "fit-content",
            }}
          >
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                padding: 3,
                backgroundColor: "#ffffff",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                PRICE DETAILS
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Price Breakdown */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Price</Typography>
                  <Typography>${cart.cart?.totalPrice}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Discount</Typography>
                  <Typography sx={{ color: "green" }}>
                    -${cart.cart?.discounted}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
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
                    ${cart.cart?.totalDiscountedPrice}
                  </Typography>
                </Box>
              </Box>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  bgcolor: "#9155fd",
                  "&:hover": { bgcolor: "#7e4ad6" },
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Cart;
