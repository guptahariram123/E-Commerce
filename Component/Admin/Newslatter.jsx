import React, { useEffect } from 'react'
import SideNavbar from './SideNavbar'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { getNewslatter,deleteNewslatter } from "../../Store/ActionCreators/NewslatterActionCreators"
import { useDispatch, useSelector } from 'react-redux';


export default function Newslatter() {
  var dispatch = useDispatch()
  var allNewslatters = useSelector((state) => state.NewslatterStateData)
  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'email', headerName: 'Email', width: 230 },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: ({ row }) =>
        <Button onClick={() => {
          dispatch(deleteNewslatter({ id: row.id }))
        }}>
          <i className='fa fa-trash text-danger'></i>
        </Button>,
    }

  ];  
  var rows = []
  if(allNewslatters.length){
    for(let item of allNewslatters.slice(1,allNewslatters.length))
    rows.push(item)
  }
  function getAPIData(){
    dispatch(getNewslatter())
  }
  useEffect(() => {
    getAPIData()
  }, [allNewslatters.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>

          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Newslatter </h4>
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
