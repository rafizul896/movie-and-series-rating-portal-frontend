"use client"
import React from 'react'
import OrderHistoryTable from './OrderHistoryTable'

const ManageOrderHistory = ({data}:any) => {
  const tableData = data?.data?.data 
  return (
    <div>
        <OrderHistoryTable orderData={tableData}/>
    </div>
  )
}

export default ManageOrderHistory