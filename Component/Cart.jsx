import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCart, updateCart, deleteCart } from "../Store/ActionCreators/CartActionCreators"

export default function Cart() {
    var [subtotal, setSubTotal] = useState(0)
    var [shipping, setShipping] = useState(0)
    var [total, setTotal] = useState(0)
    var [carts, setCarts] = useState([])
    var allCarts = useSelector(state => state.CartStateData)
    var dispatch = useDispatch()
    function getAPIData() {
        dispatch(getCart())
        if (allCarts.length) {
            let data = allCarts.filter(x => x.userid === localStorage.getItem("userid"))
            setCarts(data)
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
    function update(id, op) {
        var item = carts.find(x => x.id === id)
        if (op === "Dec" && item.qty == 1)
            return
        else if (op === "Inc") {
            item.qty = item.qty + 1
            item.total = item.total + Number(item.price)
        }
        else {
            item.qty = item.qty - 1
            item.total = item.total - Number(item.price)
        }
        dispatch(updateCart({ ...item }))
        getAPIData()
    }
    function deleteItem(id) {
        dispatch(deleteCart({ id: id }))
        getAPIData()
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
                            <span className="breadcrumb-item active">Shopping Cart</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                {
                    carts.length ?
                        <div className="row px-xl-5">
                            <div className="col-lg-8 table-responsive mb-5">
                                <table className="table table-light table-borderless table-hover text-center mb-0">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Products</th>
                                            <th>Brand/color/size</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        {
                                            carts && carts.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="align-middle d-flex"><img src={`/assets/images/${item.pic}`} alt="" style={{ width: "50px", height: "60px" }} className='rounded' />{item.name}</td>
                                                    <td className="align-middle">{item.brand}/{item.color}/{item.size}</td>
                                                    <td className="align-middle">&#8377;{item.price}</td>
                                                    <td className="align-middle">
                                                        <div className="input-group quantity mx-auto" style={{ width: "150px" }}>
                                                            <div className="input-group-btn">
                                                                <button className="btn btn-sm btn-primary btn-minus" onClick={() => update(item.id, "Dec")}>
                                                                    <i className="fa fa-minus" ></i>
                                                                </button>
                                                            </div>
                                                            <p style={{ width: "50px" }}>{item.qty}</p>
                                                            <div className="input-group-btn">
                                                                <button className="btn btn-sm btn-primary btn-plus" onClick={() => update(item.id, "Inc")}>
                                                                    <i className="fa fa-plus" ></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">&#8377;{item.total}</td>
                                                    <td className="align-middle"><button className="btn btn-sm btn-danger" onClick={() => deleteItem(item.id)}><i className="fa fa-times" ></i></button></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-4">
                                {/* <form className="mb-30" action="">
                            <div className="input-group">
                                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form> */}
                                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                                <div className="bg-light p-30 mb-5">
                                    <div className="border-bottom pb-2">
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
                                        <Link to="/checkout" className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</Link>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className='text-center  m-5' style={{fontSize:"40px"}}>No Items In Cart</div>
                }
            </div>
        </>
    )
}
