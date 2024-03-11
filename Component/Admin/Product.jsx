import React, { useEffect } from 'react'
import SideNavbar from './SideNavbar'
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { getProduct,deleteProduct } from "../../Store/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux';


export default function Product() {
  var dispatch = useDispatch()
  var allProduct = useSelector((state) => state.ProductStateData)
  var navigate=useNavigate()
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'maincategory', headerName: 'Maincategory', width: 130 },
    { field: 'subcategory', headerName: 'Subcategory', width: 130 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'color', headerName: 'Color', width: 80 },
    { field: 'size', headerName: 'Size', width: 70 },
    { field: 'baseprice', headerName: 'Base Price', width: 100 ,renderCell:({row})=>{
      return <p>&#8377;{row.baseprice } </p>
    }},
    { field: 'discount', headerName: 'Discount', width: 100 ,renderCell:({row})=>{
      return <p>{row.discount}% Off</p>
    }},
    { field: 'finalprice', headerName: 'Final Price', width: 100 ,renderCell:({row})=>{
      return <p>&#8377;{row.finalprice}</p>
    }},
    {field: 'stock' ,headerName:'Stock',width:100},
    { field: 'pic1', headerName: 'Pic1', width: 100 ,renderCell:({row})=>{
      return <a href={`/assets/images/${row.pic1} `} target='_blank'>
        <img src={`/assets/images/${row.pic1} `} style={{height:"100px",width:"100px"}} alt="" />
      </a>
      
    }},
    { field: 'pic2', headerName: 'Pic2', width: 100 ,renderCell:({row})=>{
      return <a href={`/assets/images/${row.pic2} `} target='_blank'>
      <img src={`/assets/images/${row.pic2} `} style={{height:"100px",width:"100px"}} alt="" />
    </a>
    }},
    { field: 'pic3', headerName: 'Pic3', width: 100 ,renderCell:({row})=>{
      return <a href={`/assets/images/${row.pic3} `} target='_blank'>
      <img src={`/assets/images/${row.pic3} `} style={{height:"100px",width:"100px"}} alt="" />
    </a>
    }},
    { field: 'pic4', headerName: 'Pic4', width: 100 ,renderCell:({row})=>{
      return <a href={`/assets/images/${row.pic4} `} target='_blank'>
        <img src={`/assets/images/${row.pic4} `} style={{height:"100px",width:"100px"}} alt="" />
      </a>
    }},
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: ({ row }) =>
        <Button onClick={() => {
          navigate("/admin-update-products/" + row.id)
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
          dispatch(deleteProduct({ id: row.id }))
        }}>
          <i className='fa fa-trash text-danger'></i>
        </Button>,
    }

  ];  
  var rows = []
  if(allProduct.length){
    for(let item of allProduct.slice(1,allProduct.length))
    rows.push(item)
  }
  function getAPIData(){
    dispatch(getProduct())
  }
  useEffect(() => {
    getAPIData()
  }, [allProduct.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>

          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Product <Link to="/admin-add-products " className='text-dark'><span className='fa fa-plus float-right '></span></Link></h4>
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
