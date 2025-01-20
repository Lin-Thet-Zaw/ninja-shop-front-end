import React from 'react'

const AddressCard = ({address}) => {
  return (
    <div className='space-y-3'>
      <p className='font-semibold'>{address.firstName} {address.lastName}</p>
      <p>{address.city}, {address.streetAddress}, {address.state}, {address.zipCode}</p>
      <div className='space-y-1'>
      <p className='font-semibold'>Phone</p>
      <p>{address.mobile}</p>
      </div>
    </div>
  )
}

export default AddressCard
