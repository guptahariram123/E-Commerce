import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import {getProduct} from "../Store/ActionCreators/ProductActionCreators"
import {getCart,addCart} from "../Store/ActionCreators/CartActionCreators"
import {getWishlist,addWishlist} from "../Store/ActionCreators/WishlistActionCreators"

import { Link, useNavigate, useParams } from 'react-router-dom'

export default function SingleProduct() {
    var[product,setProduct]=useState({
        pic1:"",
        pic2:"",
        pic3:"",
        pic4:"",

    })
    var [qty,setQty]=useState(1)
    var dispatch=useDispatch()
    var allProducts=useSelector((state)=>state.ProductStateData)
    var allCarts=useSelector((state)=>state.CartStateData)
    var allWishlists=useSelector((state)=>state.WishlistStateData)
    var navigate=useNavigate()

    var {id}=useParams()

    function getInputData(e){
        setQty(Number(e.target.value))
    }

    function getAPIData(){
       dispatch(getProduct())
       dispatch(getCart())
       dispatch(getWishlist())
       if(allProducts.length){
        var item =allProducts.find((x)=>x.id=== Number(id))
        if(item)
        setProduct(item)
       }
    }
    function addToCart(){
       var item= allCarts.find((x)=>x.productid===id)
       if(item)
       navigate("/cart")
       else{
        var item={
            productid:id,
            userid:localStorage.getItem("userid"),
            name:product.name,
            color:product.color,
            size:product.size,
            price:product.finalprice,
            brand:product.brand,
            qty:qty,
            total:product.finalprice*qty,
            pic:product.pic1,

        }
        dispatch(addCart(item))
        navigate("/cart")
       }

    }
    function addToWishlist(){
        var item= allWishlists.find((x)=>x.productid===id)
       if(item)
       navigate("/wishlist")
       else{
        var item={
            productid:id,
            userid:localStorage.getItem("userid"),
            name:product.name,
            color:product.color,
            size:product.size,
            price:product.finalprice,
            brand:product.brand,
            pic:product.pic1,

        }
        dispatch(addWishlist(item))
        navigate("/profile")
       }
    }
    useEffect(getAPIData,[allProducts.length])
  return (
    <>
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                    <Link className="breadcrumb-item text-dark" to="/shop/All/All/All">Shop</Link>
                    <span className="breadcrumb-item active">Product</span>
                </nav>
            </div>
        </div>
    </div>
    <div className="container-fluid pb-5">
        <div className="row px-xl-5">
            <div className="col-lg-5 mb-30">
                <div id="product-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner bg-light">
                        <div className="carousel-item active">
                            <img className="" src={`/assets/images/${product.pic1}`} style={{height:"500px",width:"500px"}} alt="Image"/>
                        </div>
                        <div className="carousel-item">
                            <img className="" src={`/assets/images/${product.pic2}`} style={{height:"500px",width:"500px"}} alt="Image"/>
                        </div>
                        <div className="carousel-item">
                            <img className="" src={`/assets/images/${product.pic3}`} style={{height:"500px",width:"500px"}} alt="Image"/>
                        </div>
                        <div className="carousel-item">
                            <img className="" src={`/assets/images/${product.pic4}`} style={{height:"500px",width:"500px"}} alt="Image"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                        <i className="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                        <i className="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
            </div>

            <div className="col-lg-7 h-auto mb-30">
                <div className="h-100 bg-light p-30">
                    <h4>{product.maincategory}/{product.subcategory}/{product.brand}</h4>
                    <h3>{product.name}</h3>
                    
                    <h3 className="font-weight-semi-bold mb-4"><del className='text-danger'>&#8377;{product.baseprice}</del> &#8377;{product.finalprice} <sup>{product.discount}% off</sup></h3>
                    <p className="mb-4">{product.description}</p>
                    <div className="d-flex mb-3">
                        <strong className="text-dark mr-3">Sizes:</strong>
                        <p>{product.size}</p>
                    </div>
                    <div className="d-flex mb-4">
                        <strong className="text-dark mr-3">Colors:</strong>
                       {product.color}
                    </div>
                    <div className="d-flex align-items-center mb-4 pt-2">
                        <div className="input-group quantity mr-3" style={{width: "150px"}}>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-minus" onClick={()=>{
                                    if(qty>1)
                                    setQty(qty-1)
                                }}>
                                    <i className="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" onChange={getInputData}  className="form-control bg-secondary border-0 text-center" value={qty}/>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-plus" onClick={()=>setQty(qty+1)}> 
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-primary px-3" onClick={addToCart}><i className="fa fa-shopping-cart mr-1"></i> Add To
                            Cart</button>
                            <button className="btn btn-danger px-3" onClick={addToWishlist}><i className="fa fa-heart mr-1"></i> Add To
                            Wishlist</button>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
    </>
  )
}
