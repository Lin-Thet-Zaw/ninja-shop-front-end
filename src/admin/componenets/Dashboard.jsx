import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import OrdersTable from './OrdersTable'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
const {auth} = useSelector((store)=>store)
const navigate = useNavigate();
  // if (auth?.user === null) {
  //   // toast.info("Plase login");
  //   navigate("/");
  // }
  // if (auth?.user?.role != "admin") {
  //   // toast.info("Your not admin")
  //   navigate("/");
  // }

  return (
    <div>
      <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Achivement />
          </Grid>
      </Grid>
      <OrdersTable/>
    </div>
  )
}

export default Dashboard
