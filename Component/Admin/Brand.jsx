import React, { useEffect } from 'react'
import SideNavbar from './SideNavbar'
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { getBrand,deleteBrand } from "../../Store/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux';


export default function Brand() {
  var dispatch = useDispatch()
  var allBrand = useSelector((state) => state.BrandStateData)
  var navigate=useNavigate()
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: ({ row }) =>
        <Button onClick={() => {
          navigate("/admin-update-brands/" + row.id)
        }}>
          <i className='fa fa-edit'></i>
        </Button>,
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: ({ row }) =>
        <Button onClick={() => {
          dispatch(deleteBrand({ id: row.id }))
        }}>
          <i className='fa fa-trash text-danger'></i>
        </Button>,
    }

  ];  
  var rows = []
  if(allBrand.length){
    for(let item of allBrand.slice(1,allBrand.length))
    rows.push(item)
  }
  function getAPIData(){
    dispatch(getBrand())
  }
  useEffect(() => {
    getAPIData()
  }, [allBrand.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>

          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Brand <Link to="/admin-add-brands " className='text-dark'><span className='fa fa-plus float-right '></span></Link></h4>
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
