import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import OrdersTable from './OrdersTable'

const Dashboard = () => {
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
