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
  IconButton,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Dashboard from "./componenets/Dashboard";
import CreateProductForm from "./componenets/CreateProductForm";
import ProductsTable from "./componenets/ProductsTable";
import OrdersTable from "./componenets/OrdersTable";
import CustomersTable from "./componenets/CustomersTable";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Auth/Action";
import { toast } from "react-toastify";

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <InventoryIcon /> },
  { name: "Add Product", path: "/admin/product/create", icon: <AddIcon /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  if (auth?.user?.role != "admin") {
    toast.info("Your not admin")
    navigate("/");
  }

  if(auth?.user === null){
    // toast.info("Please login")
    navigate("/")
  }

  // Logout function
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/"); // Navigate to the homepage
  };

  // Sidebar content
  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: 240,
      }}
    >
      {/* Menu Items */}
      <List>
        {menu.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => {
              navigate(item.path);
              setSidebarVisible(false); // Close sidebar on navigation for small screens
            }}
          >
            <ListItemButton
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "rgba(0, 0, 0, 0.08)" : "inherit",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Logout Button */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        {/* Sidebar for large screens */}
        {isLargeScreen && (
          <Box
            sx={{
              width: 240,
              flexShrink: 0,
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            {drawer}
          </Box>
        )}
        {/* Drawer for small screens */}
        {!isLargeScreen && (
          <Drawer
            open={sidebarVisible}
            onClose={() => setSidebarVisible(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: isLargeScreen ? "calc(100% - 240px)" : "100%",
          }}
        >
          {/* Toolbar with menu button for small screens */}
          {!isLargeScreen && (
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setSidebarVisible(true)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          )}
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product/create" element={<CreateProductForm />} />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/orders" element={<OrdersTable />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
};

export default Admin;