import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  comfirmedOrder,
  deleteOrder,
  deliverOrder,
  getOrders,
  shipOrder,
} from "../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { adminOrder} = useSelector((store) => store);
  const  navigate = useNavigate();
  const getStorateJwt = localStorage.getItem("jwt");
  if (getStorateJwt === null) {
    navigate("/");
  }
  // if(auth?.user?.role != "admin"){
  // // toast.info("You are not admin")
  // navigate("/")
  // }

  // if(auth?.user === null){
  //   // toast.info("Please login")
  //   navigate("/")
  // }

  const [anchorElMap, setAnchorElMap] = React.useState({});

  const handleClick = (event, orderId) => {
    setAnchorElMap((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId) => {
    setAnchorElMap((prev) => ({ ...prev, [orderId]: null }));
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [
    adminOrder.shippedOrder,
    adminOrder.deliveredOrder,
    adminOrder.cancelledOrder,
    adminOrder.deletedOrder,
    adminOrder.comfirmedOrder,
  ]);

  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose(orderId);
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(comfirmedOrder(orderId));
    handleClose(orderId);
  };

  const handleCancelledOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
    handleClose(orderId);
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliverOrder(orderId));
    handleClose(orderId);
  };

  const handleDeletedOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <div>
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <AvatarGroup>
                      {item.orderItemList.map((orderItem) => (
                        <Avatar key={orderItem.id} src={orderItem.product.imageUrl}></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell align="left" scope="row">
                    {item.orderItemList.map((orderItem) => (
                      <p key={orderItem.id}>{orderItem.product.title}</p>
                    ))}
                  </TableCell>
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left">{item.totalPrice}</TableCell>
                  <TableCell align="left">
                    <span
                      className={`${
                        item.orderStatus === "PENDING"
                          ? "text-red-500"
                          : item.orderStatus === "COMFIRMED"
                          ? "text-green-500"
                          : item.orderStatus === "CANCELLED"
                          ? "text-red-900"
                          : item.orderStatus === "PLACED"
                          ? "text-blue-500"
                          : item.orderStatus === "SHIPPED"
                          ? "text-blue-900"
                          : item.orderStatus === "DELIVERED"
                          ? "text-green-900"
                          : ""
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      id="basic-button"
                      aria-controls={anchorElMap[item.id] ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={anchorElMap[item.id] ? "true" : undefined}
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      Status
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorElMap[item.id]}
                      open={Boolean(anchorElMap[item.id])}
                      onClose={() => handleClose(item.id)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={() => handleShippedOrder(item.id)}>Shipped Order</MenuItem>
                      <MenuItem onClick={() => handleConfirmedOrder(item.id)}>Confirmed Order</MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(item.id)}>Delivered Order</MenuItem>
                      <MenuItem onClick={() => handleCancelledOrder(item.id)}>Cancel Order</MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="left">
                    <Button variant="outlined" onClick={() => handleDeletedOrder(item.id)}>
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTable;