import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { deleteCart, getCart } from "../Store/ActionCreators/CartActionCreators"
import { addCheckout } from "../Store/ActionCreators/CheckoutActionCreators"

import { useDispatch, useSelector } from 'react-redux'

import BuyerProfile from './BuyerProfile'
export default function Checkout() {
    var navigate = useNavigate()
    var [user, setUser] = useState({})
    var [cart, setCart] = useState([])
    var [subtotal, setSubTotal] = useState(0)
    var [shipping, setShipping] = useState(0)
    var [total, setTotal] = useState(0)
    var[mode,setMode]=useState("COD")

    var allCarts = useSelector(state => state.CartStateData)
    var dispatch = useDispatch()
    async function getAPIData() {
        var response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response)
            setUser(response)
        else
            navigate("/login")

        dispatch(getCart())
        if (allCarts.length) {
            let data = allCarts.filter(x => x.userid === localStorage.getItem("userid"))
            setCart(data)
            let count = 0
            for (let item of data) {
                count = count + item.total
            }
            let shipping = 0
            if (count > 0 && count < 1000)
                shipping = 150

            setShipping(shipping)
            setSubTotal(count)
            setTotal(count + shipping)
        }
    }
    function getMode(e){
        setMode(e.target.value)
    }
    function placeOrder(){
      var item={
        userid:localStorage.getItem("userid"),
        paymentmode:mode,
        paymentstatus:"Pending",
        orderstatus:"Order Placed",
        subtotal:subtotal,
        shipping:shipping,
        total:total,
        products:cart,
        date:new Date()
      }
      dispatch(addCheckout(item))
      for(let item of cart){
        dispatch(deleteCart({id:item.id}))
      }
      navigate("/confimation")
    }
    useEffect(() => {
        getAPIData()
    }, [allCarts.length])
    return (
        <>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                            <Link className="breadcrumb-item text-dark" to="/shop/All/All/All">Shop</Link>
                            <span className="breadcrumb-item active">Checkout</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-5">
                        <h5 className="section-title text-center position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                        <BuyerProfile className="card" user={user} />
                    </div>
                    <div className="col-lg-7">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom">
                                <h6 className="mb-3">Products</h6>
                                {
                                    cart.map((item, index) => {
                                        return <div className="d-flex justify-content-between">
                                            <p>{item.name}(&#8377;{item.price}X{item.qty})</p>
                                            <p>&#8377;{item.total}</p>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="border-bottom pt-3 pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>&#8377;{subtotal}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">&#8377;{shipping}</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>&#8377;{total}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                            <div className="bg-light p-30">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" onChange={getMode} name="mode" checked id="cod" />
                                        <label className="custom-control-label" for="cod">COD</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" disabled className="custom-control-input" onChange={getMode} name="mode" id="netbanking" />
                                        <label className="custom-control-label" for="netbanking">Net Banking/Card/UPI</label>
                                    </div>
                                </div>
                                <button className="btn btn-block btn-primary font-weight-bold py-3" onClick={placeOrder}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
