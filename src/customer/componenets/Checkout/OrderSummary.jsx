import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItems from "../Cart/CartItems";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { comfirmedOrder, getOrderById } from "../../../State/Order/Action";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {order} = useSelector(store=>store)
  const address = order.order?.shippingAddress || {}
  const location  = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  console.log("Order ID:", orderId);

  useEffect(() => {
    dispatch(getOrderById(orderId))
  },[orderId])

    const comfirmedOrderHandler = () => {
      const orderData = { orderId, navigate };
      dispatch(comfirmedOrder(orderData));
    }
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard address={address}/>
      </div>
      <div>
        <div className="lg:grid grid-cols-3 relative">
          <div className="col-span-2">
            {order.order?.orderItemList.map((item) => (
              <CartItems item={item}/>
            ))}
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border">
              <p className="uppercase font-bold opacity-60">Price Details</p>
              <hr />
              <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>${order.order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Discount</span>
                  <span className="text-green-600">-${order.order?.discounted}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Delivery Charge </span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Total Amount</span>
                  <span className="text-green-600">${order.order?.totalDiscountPrice}</span>
                </div>
              </div>
              <Button onClick={comfirmedOrderHandler}
                variant="contained"
                className="w-full mt-5"
                sx={{ px: "2.5rem", py: "0.7rem", bgcolor: "#9155fd" }}
              >
                Comfirm Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
