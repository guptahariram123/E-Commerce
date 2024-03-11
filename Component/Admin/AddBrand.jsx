import React, { useEffect, useState } from 'react'
import SideNavbar from './SideNavbar'
import { addBrand, getBrand } from "../../Store/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AddBrand() {
  var [data, setData] = useState({
    name: ""
  })
  var dispatch = useDispatch()
  var navigate = useNavigate()
  var allBrand = useSelector((state) => state.BrandStateData)
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
    var item = allBrand.find(x =>x.name && x.name.toLowerCase() === data.name.toLowerCase())
    if (item) {
         alert("Brand is Already Exists !!!")
    }
    else {
      dispatch(addBrand({ name: data.name }))
      return navigate("/admin-brands")
    }
  }
  function getAPIData() {
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
            <h4 className='text-center bg-primary p-2'>Brand </h4>
            <div className="">
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" onChange={getInputData} id="name" placeholder='Enter Brand: ' className='form-control' />
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
