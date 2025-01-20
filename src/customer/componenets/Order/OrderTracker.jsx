import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

const OrderTracker = ({activeStep}) => {
    const steps = [
        "Placed",
        "Order Comfirmed",
        "Shipped",
        "Out For Delivery",
        "Delivered"
    ]
  return (
    <div className='w-full'>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => 
            <Step>
                <StepLabel sx={{color:"#9115FD", fontSize:"44px"}}>{label}</StepLabel>
            </Step>)}
        </Stepper>
    </div>
  )
}

export default OrderTracker
