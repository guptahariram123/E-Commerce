import React, { useEffect, useState } from 'react'
import SideNavbar from './SideNavbar'
import { addProduct, getProduct } from "../../Store/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../Store/ActionCreators/MainCategoryActionCreators"
import { getSubcategory } from "../../Store/ActionCreators/SubCategoryActionCreators"
import { getBrand } from "../../Store/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AddProduct() {
  var [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    baseprice: 0,
    discount: 0,
    finalprice: 0,
    stock: "In Stock",
    description: "This is Sample Product",
    pic1:"",
    pic2:"",
    pic3:"",
    pic4:""

  })
  var dispatch = useDispatch()
  var navigate = useNavigate()
  var allproducts = useSelector((state) => state.ProductStateData)
  var allmaincategories = useSelector((state) => state.MaincategoryStateData)
  var allsubcategories = useSelector((state) => state.SubcategoryStateData)
  var allbrands = useSelector((state) => state.BrandStateData)
  function getInputData(e) {
    var { name, value } = e.target
    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  function getInputFile(e) {
    var { name, files } = e.target
    setData((old) => {
      return {
        ...old,
        [name]: files[0].name
      }
    })
  }
  function postData(e) {
    e.preventDefault()
    var fp = (data.baseprice) - parseInt(data.baseprice) * parseInt(data.discount) / 100
    dispatch(addProduct({
      name:data.name,
      maincategory: data.maincategory,
      subcategory: data.subcategory,
      brand: data.brand,
      color: data.color,
      size: data.size,
      baseprice: parseInt(data.baseprice),
      discount: parseInt(data.discount),
      finalprice: fp.toFixed(0),
      stock: data.stock,
      description: data.description,
      pic1: data.pic1,
      pic2: data.pic2,
      pic3: data.pic3,
      pic4: data.pic4
    }))
    return navigate("/admin-products")
  }

  function getAPIData() {
    dispatch(getProduct())
    dispatch(getMaincategory())
    dispatch(getSubcategory())
    dispatch(getBrand())
    if (allmaincategories.length && allsubcategories.length && allbrands.length) {
      setData((old) => {
        return {
          ...old,
          ['maincategory']: allmaincategories[1].name,
          ['subcategory']: allsubcategories[1].name,
          ['brand']: allbrands[1].name

        }

      })
    }

  }
  useEffect(() => {
    getAPIData()
  }, [allproducts.length, allmaincategories.length, allsubcategories.length, allbrands.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-12">
            <SideNavbar />
          </div>
          <div className="col-md-9 col-12">
            <h4 className='text-center bg-primary p-2'>Product </h4>
            <div className="">
              <form onSubmit={postData}>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" required onChange={getInputData} id="name" placeholder='Enter Product: ' className='form-control' />
                </div>
                <div className="row mb-3">
                  <div className="col-lg-3 col-md-6 col-12">
                    <label>Maincategory</label>
                    <select name="maincategory" required onChange={getInputData} className='form-control' >
                      {
                        allmaincategories.slice(1).map((item, index) => {
                          return <option key={index} value={item.name}>{item.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <label>Subcategory</label>
                    <select name="subcategory" required onChange={getInputData} className='form-control' >
                      {
                        allsubcategories.slice(1).map((item, index) => {
                          return <option key={index} value={item.name}>{item.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <label>Brands</label>
                    <select name="brand" required onChange={getInputData} className='form-control' >
                      {
                        allbrands.slice(1).map((item, index) => {
                          return <option key={index} value={item.name}>{item.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <label>Stock</label>
                    <select name="maincategory" required onChange={getInputData} className='form-control' >
                      <option value="In Stock">In Stock</option>
                      <option value="Out Of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Color</label>
                    <input type="text" name='color' required onChange={getInputData} className='form-control' placeholder='Enter Color Name' />
                  </div>
                  <div className="col-md-6">
                    <label>Size</label>
                    <input type="text" name='size' required onChange={getInputData} className='form-control' placeholder='Enter Size:' />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>BasePrice</label>
                    <input type="number" name='baseprice' required onChange={getInputData} className='form-control' placeholder='Enter Base Price' />
                  </div>
                  <div className="col-md-6">
                    <label>Discount</label>
                    <input type="number" name='discount' required onChange={getInputData} className='form-control' placeholder='Enter Discount:' />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label >Pic1</label>
                    <input type="file" name='pic1' required onChange={getInputFile} className='form-control' />
                  </div>
                  <div className="col-md-6">
                    <label >Pic2</label>
                    <input type="file" name='pic2' required onChange={getInputFile} className='form-control' />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label >Pic3</label>
                    <input type="file" name='pic3' required onChange={getInputFile} className='form-control' />
                  </div>
                  <div className="col-md-6">
                    <label >Pic4</label>
                    <input type="file" name='pic4' required onChange={getInputFile} className='form-control' />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <textarea name="description" rows="5" className='form-control' value={data.description}></textarea>
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
