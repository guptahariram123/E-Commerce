import React, { useEffect, useState } from 'react'
import SideNavbar from './SideNavbar'
import { updateSubcategory, getSubcategory } from "../../Store/ActionCreators/SubCategoryActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate ,useParams } from 'react-router-dom'

export default function UpdateSubcategory() {
  var [data, setData] = useState({
    name: ""
  })
  var {id}=useParams()
  var dispatch = useDispatch()
  var navigate = useNavigate()
  var allSubcategories = useSelector((state) => state.SubcategoryStateData)
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
    var item = allSubcategories.find(x =>x.name && x.name.toLowerCase() === data.name.toLowerCase())
    if (item) {
         alert("Subcategory is Already Exists !!!")
    }
    else {
      dispatch(updateSubcategory({id:data.id,name:data.name}))
      return navigate("/admin-subcategories")
    }
  }
  function getAPIData() {
    dispatch(getSubcategory())
    if(allSubcategories.length){
      var item=allSubcategories.find((x)=>x.id===parseInt(id))
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
  }, [allSubcategories.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>
          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Subcategories </h4>
            <div className="">
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} id="name" placeholder='Enter Subcategory: ' className='form-control' />
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
