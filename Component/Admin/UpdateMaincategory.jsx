import React, { useEffect, useState } from 'react'
import SideNavbar from './SideNavbar'
import { updateMaincategory, getMaincategory } from "../../Store/ActionCreators/MainCategoryActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate ,useParams } from 'react-router-dom'

export default function UpdateMaincategory() {
  var [data, setData] = useState({
    name: ""
  })
  var {id}=useParams()
  var dispatch = useDispatch()
  var navigate = useNavigate()
  var allMaincategories = useSelector((state) => state.MaincategoryStateData)
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
    var item = allMaincategories.find(x =>x.name && x.name.toLowerCase() === data.name.toLowerCase())
    if (item) {
         alert("Maincategory is Already Exists !!!")
    }
    else {
      dispatch(updateMaincategory({id:data.id,name:data.name}))
      return navigate("/admin-maincategories")
    }
  }
  function getAPIData() {
    dispatch(getMaincategory())
    if(allMaincategories.length){
      var item=allMaincategories.find((x)=>x.id===parseInt(id))
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
  }, [allMaincategories.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>
          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Maincategories </h4>
            <div className="">
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} id="name" placeholder='Enter Maincategory: ' className='form-control' />
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
