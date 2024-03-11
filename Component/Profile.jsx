import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getWishlist, deleteWishlist } from "../Store/ActionCreators/WishlistActionCreators"
import { getCheckout } from "../Store/ActionCreators/CheckoutActionCreators"

import { useDispatch, useSelector } from 'react-redux'
import BuyerProfile from './BuyerProfile'

export default function Profile() {
  var navigate = useNavigate()
  var [user, setUser] = useState({})
  var [wishlist, setWishlist] = useState([])
  var [order, setOrder] = useState([])

  var allWishlists = useSelector(state => state.WishlistStateData)
  var allCheckouts = useSelector(state => state.CheckoutStateData)

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

    dispatch(getWishlist())
    dispatch(getCheckout())
    if (allWishlists.length) {
      setWishlist(allWishlists.filter((x) => x.userid === localStorage.getItem("userid")))
    }
    if (allCheckouts.length) {
      setOrder(allCheckouts.filter((x) => x.userid === localStorage.getItem("userid")))
    }
  }
  function deleteItem(id) {
    dispatch(deleteWishlist({ id: id }))
  }
  useEffect(() => {
    getAPIData()
  }, [allWishlists.length, allCheckouts.length])
  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-md-6">
          {
            user.pic ?
              <img src={`/assets/images/${user.pic}`} height="600px" width="100%" alt="" /> :
              <img src={`/assets/images/mine.jpg`} height="600px" width="100%" alt="" />
          }
        </div>
        <div className="col-md-6">
          <h5 className='text-center bg-primary p-2'>My Profile</h5>
          <BuyerProfile user={user} />
        </div>
      </div>
      <h5 className='mt-2 text-center bg-primary p-2'>Wishlists</h5>
      <div className="table-responsive">
        {
          wishlist.length ?
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>color</th>
                  <th>size</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                </tr>
                {
                  wishlist.map((item, index) => {
                    return <tr>
                      <td><a target='_blank' href={`/assets/images/${item.pic}`}>
                        <img src={`/assets/images/${item.pic}`} height="100px" width="100%" className='rounded' alt="" /></a></td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.color}</td>
                      <td>{item.size}</td>
                      <td>&#8377;{item.price}</td>
                      <td><Link to={`/single-product/${item.productid}`}><i className='fa fa-shopping-cart text-success'></i></Link></td>
                      <td><button className='btn' onClick={() => deleteItem(item.id)}><i className='fa fa-trash text-danger'></i></button></td>

                    </tr>
                  })
                }
              </tbody>
            </table> :
            <div className='text-center m-5' style={{ fontSize: "30px" }}>
              No Items In Wishlist
            </div>
        }
        <h5 className='mt-2 bg-primary p-2 text-center'>Order History</h5>
        {
          order.length ?
            order.map((item, index) => {
              return <div key={index} className="row">
                <div className="col-lg-4">
                  <div className="table-responsive">
                    <table className='table table-sm table-bordered'>
                      <tbody>
                        <tr>
                          <th>Order Id</th>
                          <td>{item.id}</td>
                        </tr>
                        <tr>
                          <th>Order Status</th>
                          <td>{item.orderstatus}</td>
                        </tr>
                        <tr>
                          <th>Payment Mode</th>
                          <td>{item.paymentmode}</td>
                        </tr>
                        <tr>
                          <th>Payment Status</th>
                          <td>{item.paymentstatus}</td>
                        </tr>
                        <tr>
                          <th>Sub Total</th>
                          <td>&#8377;{item.subtotal}</td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td>&#8377;{item.shipping}</td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>&#8377;{item.total}</td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td>{item.date}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-lg-8">
                  <h6 className='text-center bg-info p-2'>Order Products</h6>
                  <div className="table-responsive">
                  <table className='table table-sm table-bordered '>
                    <tbody>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Colour</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                      {
                        item.products.map((p, index) => {
                         return <tr key={index}>
                            <td><img src={`/assets/images/${p.pic}`} height="70px" width="70px" className='rounded' alt="" /></td>
                            <td>{p.name}</td>
                            <td>{p.brand}</td>
                            <td>{p.color}</td>
                            <td>{p.size}</td>
                            <td>&#8377;{p.price}</td>
                            <td>{p.qty}</td>
                            <td>&#8377;{p.total}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                  </div>
                </div>
                <hr style={{ border: "3px solid lightgray", width: "100%" }} />
              </div>
            })
            :
            <div className='text-center m-5' style={{ fontSize: "30px" }}>
              No Orders in History Found !!!
            </div>
        }
      </div>
    </div>
  )
}
