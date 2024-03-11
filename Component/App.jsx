import React, { useState } from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'
import Footer from './Footer'
import Shop from './Shop'
import SingleProduct from './SingleProduct'
import Cart from './Cart'
import Checkout from './Checkout'
import Contact from './Contact'

import AdminHome from './Admin/AdminHome'
import Maincategory from './Admin/Maincategory'
import AddMaincategory from './Admin/AddMaincategory'
import UpdateMaincategory from './Admin/UpdateMaincategory'
import Brand from './Admin/Brand'
import AddBrand from './Admin/AddBrand'
import UpdateBrand from './Admin/UpdateBrand'
import Subcategory from './Admin/Subcategory'
import AddSubcategory from './Admin/AddSubcategory'
import UpdateSubcategory from './Admin/UpdateSubcategory'

import Product from './Admin/Product'
import AddProduct from './Admin/AddProduct'
import UpdateProduct from './Admin/UpdateProduct'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import Confirmation from './Confirmation'
import Newslatter from './Admin/Newslatter'
import Users from './Admin/Users'
import AdminContact from "./Admin/AdminContact"
import AdminSingleContact from './Admin/AdminSingleContact'
import AdminCheckout from './Admin/AdminCheckout'
import AdminSingleCheckout from './Admin/AdminSingleCheckout'

export default function App() {
  let[search,setSearch]=useState("")
  const changeSearch=(data)=>{
    setSearch(data)
  }
  return (
    <BrowserRouter>
    <Navbar changeSearch={changeSearch}/>
     <Routes>
        <Route path='' element={<Home search={search}/>}/>
        <Route path='/shop/:maincat/:subcat/:brnd' element={<Shop search={search}/>}/>
        <Route path='/single-product/:id' element={<SingleProduct search={search}/>}/>
        <Route path='/cart' element={<Cart search={search}/>}/>
        <Route path='/checkout' element={<Checkout search={search}/>}/>
        <Route path='/contact' element={<Contact search={search}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/update-profile' element={<UpdateProfile/>}/>
        <Route path='/confimation' element={<Confirmation/>}/>
        

        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/admin-maincategories' element={<Maincategory search={search}/>}/>
        <Route path='/admin-add-maincategory' element={<AddMaincategory search={search}/>}/>
        <Route path='/admin-update-maincategory/:id' element={<UpdateMaincategory search={search}/>}/>
        
        <Route path='/admin-subcategories' element={<Subcategory search={search}/>}/>
        <Route path='/admin-add-subcategory' element={<AddSubcategory search={search}/>}/>
        <Route path='/admin-update-subcategory/:id' element={<UpdateSubcategory search={search}/>}/>
        
        <Route path='/admin-brands' element={<Brand search={search}/>}/>
        <Route path='/admin-add-brands' element={<AddBrand search={search}/>}/>
        <Route path='/admin-update-brands/:id' element={<UpdateBrand search={search}/>}/>

        <Route path='/admin-products' element={<Product search={search}/>}/>
        <Route path='/admin-add-products' element={<AddProduct search={search}/>}/>
        <Route path='/admin-update-products/:id' element={<UpdateProduct search={search}/>}/>

        <Route path='/admin-newslatters' element={<Newslatter/>}/>
        <Route path='/admin-users' element={<Users/>}/>
        <Route path='/admin-contacts' element={<AdminContact/>}/>
        <Route path='/admin-single-contact/:id' element={<AdminSingleContact/>}/>
        <Route path='/admin-checkouts' element={<AdminCheckout/>}/>
        <Route path='/admin-single-checkouts/:id' element={<AdminSingleCheckout/>}/>
        
     </Routes>
     <Footer/>
    </BrowserRouter>
  )
}
