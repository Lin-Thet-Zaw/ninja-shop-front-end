import { Button } from '@headlessui/react'
import { Card, CardContent, styled, Typography } from '@mui/material'
import React from 'react'

const TrophyImg = styled("img")({
    right:36,
    bottom:20,
    height:98,
    position:"absolute"
})
const Achivement = () => {
  return (
    <Card  className="space-y-5" sx={{position:"relative", bgcolor:"black", color:"white"}}>
        <CardContent>
            <Typography variant='h6' sx={{letterSpacing:".25px"}}>Ninja Shop</Typography>
            <Typography variant='body2'>Congratulations</Typography>
            <Typography variant='h5' sx={{my:3.5}}>29.9k</Typography>
            <Button size="small" variant="contained">
                views sales
            </Button>
            <TrophyImg src='https://media.istockphoto.com/id/1343489374/nl/vector/winning-cup-in-hand-first-place-symbol-of-success.jpg?s=1024x1024&w=is&k=20&c=EfVJuHfVrRN7PRG_7WIAyphzrQ9N6fDtlXXALaHMQKk='></TrophyImg>
        </CardContent>

    </Card>
  )
}

export default Achivement
