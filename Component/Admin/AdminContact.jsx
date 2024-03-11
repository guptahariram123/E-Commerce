import React, { useEffect } from 'react'
import SideNavbar from './SideNavbar'
import {  useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { getContactUs,deleteContactUs } from "../../Store/ActionCreators/ContactUsActionCreators"
import { useDispatch, useSelector } from 'react-redux';


export default function AdminContact() {
  var dispatch = useDispatch()
  var allContacts = useSelector((state) => state.ContactUsStateData)
  var navigate=useNavigate()
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'subject', headerName: 'Subject', width: 250 },
    { field: 'status', headerName: 'Status', width: 70 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      renderCell: ({ row }) =>
        <Button onClick={() => {
          navigate("/admin-single-contact/" + row.id)
        }}>
          <i className='fa fa-eye'></i>
        </Button>,
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: ({ row }) =>
      row.status==="Done"?
        <Button onClick={() => {
          dispatch(deleteContactUs({ id: row.id }))
        }}>
          <i className='fa fa-trash text-danger'></i>
        </Button>: ""
    }

  ];  
  var rows = []
  if(allContacts.length){
    for(let item of allContacts.slice(1,allContacts.length))
    rows.push(item)
  }
  function getAPIData(){
    dispatch(getContactUs())
  }
  useEffect(() => {
    getAPIData()
  }, [allContacts.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>

          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Contact</h4>
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
