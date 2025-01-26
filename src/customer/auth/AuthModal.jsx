import { Box, Modal, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import RegisterForm from "./RegisterForm";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import ForgetPassword from "./ForgetPassword";

const AuthModal = ({ handleClose, open }) => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Use raw query as fallback

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "90%" : 500, // Full width for small screens
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: isSmallScreen ? 2 : 4, // Adjust padding for small screens
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/forget-password" ? (
            <ForgetPassword />
          ): location.pathname === "/register" ?(
            <RegisterForm />
          ) :(< LoginForm/>)}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
