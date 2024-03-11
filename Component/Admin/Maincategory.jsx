import React, { useEffect } from 'react'
import SideNavbar from './SideNavbar'
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { getMaincategory,deleteMaincategory } from "../../Store/ActionCreators/MainCategoryActionCreators"
import { useDispatch, useSelector } from 'react-redux';


export default function Maincategory() {
  var dispatch = useDispatch()
  var allmaincategories = useSelector((state) => state.MaincategoryStateData)
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
          navigate("/admin-update-maincategory/" + row.id)
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
          dispatch(deleteMaincategory({ id: row.id }))
        }}>
          <i className='fa fa-trash text-danger'></i>
        </Button>,
    }

  ];  
  var rows = []
  if(allmaincategories.length){
    for(let item of allmaincategories.slice(1,allmaincategories.length))
    rows.push(item)
  }
  function getAPIData(){
    dispatch(getMaincategory())
  }
  useEffect(() => {
    getAPIData()
  }, [allmaincategories.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>

          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Maincategories <Link to="/admin-add-maincategory " className='text-dark'><span className='fa fa-plus float-right '></span></Link></h4>
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
