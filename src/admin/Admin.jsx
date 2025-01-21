
import { InboxIcon } from "@heroicons/react/24/outline";
import EmailIcon from "@mui/icons-material/Email";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import Dashboard from "./componenets/Dashboard";
import CreateProductForm from "./componenets/CreateProductForm";
import ProductsTable from "./componenets/ProductsTable";
import OrdersTable from "./componenets/OrdersTable";
import CustomersTable from "./componenets/CustomersTable";
const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <InventoryIcon />},
  {
    name: "Customer",
    path: "/admin/customers",
    icon: <SupervisedUserCircleIcon />,
  },
  { name: "AddProduct", path: "/admin/product/create",icon: <AddIcon />  },
];
const Admin = () => {
  const theme = useTheme();
//   const isLargetScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sizeBarVisible, setSizeBarVisible] = useState(false);
  const navvigate = useNavigate();
  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height:"100%"
      }}
    >
      {/* {isLargetScreen && <Toolbar />} */}
      <>
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navvigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      <div className="flex h-[100vh]">
        <CssBaseline />
        <div className="w-[15%] border border-r-gray-300 h-full">
          {drawer}
        </div>
        <Box className="w-[85%]" component={"main"} sx={{flexGrow:1}}>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/product/create' element={<CreateProductForm />}></Route>
          <Route path='/product' element={<ProductsTable />}></Route>
          <Route path='/orders' element={<OrdersTable />}></Route>
          <Route path='/customer' element={<CustomersTable />}></Route>
        </Routes>
        </Box>
      </div>
    </div>
  );
};

export default Admin;
