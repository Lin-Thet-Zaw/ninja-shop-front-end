import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Achivement from './Achivement'
import OrdersTable from './OrdersTable'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../State/Auth/Action'
import { toast } from 'react-toastify'

const Dashboard = () => {
const {auth} = useSelector((store)=>store)
const navigate = useNavigate();
const disptach = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // Fetch user data using JWT
  useEffect(() => {
    if (jwt) {
      disptach(getUser(jwt)); // Dispatch action to get user data
    } else{
      navigate("/")
    }
  }, [jwt, disptach]);

  // Redirect if auth is invalid or user is not admin
  useEffect(() => {
    if (!auth || auth?.user?.role !== "admin") {
      navigate("/"); // Redirect to home if user is not admin
    }
  }, [auth,navigate]);
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
