import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import DelivaryAddress from "./DelivaryAddress";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const steps = ["Login", "Delivery Address", "Order Summary", "Confirmed"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, order } = useSelector((store) => store);

  if (auth?.user === null) {
    toast.info("Plase login");
    navigate("/");
  }

  useEffect(() => {
    const querySearch = new URLSearchParams(location.search);
    const step = parseInt(querySearch.get("step"), 10); // Parse the "step" parameter correctly

    // Update activeStep if the step parameter is valid
    if (!isNaN(step) && step >= 0 && step < steps.length) {
      setActiveStep(step);
    }
  }, [location.search]);

  const updateURLStep = (step) => {
    const querySearch = new URLSearchParams(location.search);
    querySearch.set("step", step);
    navigate(`?${querySearch.toString()}`);
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    updateURLStep(nextStep);
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    updateURLStep(prevStep);
  };

  return (
    <div className="px-10 lg:px-20">
      <Helmet>
        <title>Check out - Ninja Shop</title>
        <meta
          name="description"
          content="Welcome to the homepage of our app."
        />
      </Helmet>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 1}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button disabled={activeStep === 2} onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
            <div className="mt-10">
              {/* Conditional Rendering Based on Active Step */}
              {activeStep === 0 && <p>Login</p>}
              {activeStep === 1 && <DelivaryAddress />}
              {activeStep === 2 && <OrderSummary />}
              {activeStep === 3 && <p></p>}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
