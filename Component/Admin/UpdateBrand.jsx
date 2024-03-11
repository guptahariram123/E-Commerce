import React, { useEffect, useState } from 'react'
import SideNavbar from './SideNavbar'
import { updateBrand, getBrand } from "../../Store/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate ,useParams } from 'react-router-dom'

export default function UpdateBrand() {
  var [data, setData] = useState({
    name: ""
  })
  var {id}=useParams()
  var dispatch = useDispatch()
  var navigate = useNavigate()
  var allBrands = useSelector((state) => state.BrandStateData)
  function getInputData(e) {
    var { name, value } = e.target
    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  function postData(e) {
    e.preventDefault()
    var item = allBrands.find(x =>x.name && x.name.toLowerCase() === data.name.toLowerCase())
    if (item) {
         alert("Brand is Already Exists !!!")
    }
    else {
      dispatch(updateBrand({id:data.id,name:data.name}))
      return navigate("/admin-brands")
    }
  }
  function getAPIData() {
    dispatch(getBrand())
    if(allBrands.length){
      var item=allBrands.find((x)=>x.id===parseInt(id))
      if(item){
        setData((old)=>{
          return{
            ...old,...item
          }
         
        })
      }
    }

  }
  useEffect(() => {
    getAPIData()
  }, [allBrands.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>
          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Brands </h4>
            <div className="">
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} id="name" placeholder='Enter Brand: ' className='form-control' />
                </div>
                <div className="mb-3">
                  <button type='reset' className='btn btn-danger w-50'>Reset</button>
                  <button className='btn btn-primary w-50' type='submit'>Submit</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
