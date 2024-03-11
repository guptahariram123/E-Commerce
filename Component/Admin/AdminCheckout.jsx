import React, { useEffect } from 'react'
import SideNavbar from './SideNavbar'
import {  useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { getCheckout } from "../../Store/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux';


export default function AdminCheckout() {
  var dispatch = useDispatch()
  var allCheckouts = useSelector((state) => state.CheckoutStateData)
  var navigate=useNavigate()
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'orderstatus', headerName: 'Order Status', width: 130 },
    { field: 'paymentmode', headerName: 'Payment Mode', width: 120 },
    { field: 'paymentstatus', headerName: 'Payment Status', width: 150 },
    { field: 'userid', headerName: 'User Id', width: 70 },
    { field: 'subtotal', headerName: 'sub Total', width: 80, renderCell:({row})=><p>&#8377;{row.subtotal}</p> },
    { field: 'shipping', headerName: 'Shipping', width: 80, renderCell:({row})=><p>&#8377;{row.shipping}</p> },
    { field: 'total', headerName: 'Total', width: 80, renderCell:({row})=><p>&#8377;{row.total}</p> },
    { field: 'date', headerName: 'Date', width: 200 },


    {
      field: "view",
      headerName: "View",
      sortable: false,
      renderCell: ({ row }) =>
        <Button onClick={() => {
          navigate("/admin-single-checkouts/" + row.id)
        }}>
          <i className='fa fa-eye'></i>
        </Button>,
    }

  ];  
  var rows = []
  if(allCheckouts.length){
    for(let item of allCheckouts.slice(1,allCheckouts.length))
    rows.push(item)
  }
  function getAPIData(){
    dispatch(getCheckout())
  }
  useEffect(() => {
    getAPIData()
  }, [allCheckouts.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>

          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Checkout</h4>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
