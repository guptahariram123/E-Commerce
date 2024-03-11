
import React, { useEffect, useState } from 'react'
import SideNavbar from './SideNavbar'
import { useParams } from 'react-router-dom'

import { getCheckout, updateCheckout } from "../../Store/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux';

export default function AdminSingleCheckout() {
  var [checkout, setCheckout] = useState({})
  var [paymentstatus, setPaymentStatus] = useState("")
  var [orderstatus, setOrderStatus] = useState("")
  var dispatch = useDispatch()
  var allCheckouts = useSelector((state) => state.CheckoutStateData)
  var { id } = useParams()
  function getAPIData() {
    dispatch(getCheckout())
    if (allCheckouts.length) {
      var item = allCheckouts.find((x) => x.id == id)
      setCheckout(item)
      setPaymentStatus(item.paymentstatus)
      setOrderStatus(item.orderstatus)
    }
  }
  function getPaymentStatus(e){
    setPaymentStatus(e.target.value)
  }
  function getOrderStatus(e){
    setOrderStatus(e.target.value)
  }
  function updateItem() {
    dispatch(updateCheckout({ ...checkout, orderstatus:orderstatus,paymentstatus:paymentstatus }))
    setCheckout((old) => {
      return {
        ...old,
        ['orderstatus']: orderstatus,
        ['paymentstatus']:paymentstatus
      }
    })
  }
  useEffect(() => {
    getAPIData()
  }, [allCheckouts.length])
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-12">
          <SideNavbar />
        </div>

        <div className="col-md-9 col-12">
          <h4 className='text-center bg-primary p-2'>Checkout</h4>
          <div className="table-responsive">
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>Id</th>
                  <td>{checkout.id}</td>
                </tr>
                <tr>
                  <th>Payment Mode</th>
                  <td>{checkout.paymentmode}</td>
                </tr>
                <tr>
                  <th>payment Status</th>
                  <td>{checkout.paymentstatus}
                  <br />
                  {
                    checkout.paymentmode === "COD" && checkout.paymentstatus === "Pending" ?
                      <select name="paymentstatus" onChange={getPaymentStatus} className='form-control'>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                      </select>
                      : ""
                  }
                  </td>
                </tr>
                <tr>
                  <th>Order Status</th>
                  <td>{checkout.orderstatus}
                  <br />
                  {
                    checkout.orderstatus!=="Delivered" ?
                      <select name="orderstatus" onChange={getOrderStatus} className='form-control'>
                        <option value="Pending">Order Placed</option>
                        <option value="Packed">Packed</option>
                        <option value="Ready to Ship">Ready to Ship</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      : ""
                  }
                  </td>
                </tr>
                <tr>
                  <th>Total Amount</th>
                  <td>&#8377;{checkout.subtotal}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>&#8377;{checkout.shipping}</td>
                </tr>
                <tr>
                  <th>Final Amount</th>
                  <td>&#8377;{checkout.total}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{checkout.date}</td>
                </tr>
                <tr>
                  {
                    checkout.status === "Pending" || checkout.orderstatus!=="Delivered" ?
                      <td colSpan={2}><button className='btn bg-primary w-100' onClick={updateItem}>Update</button></td>
                      : ""
                  }
                </tr>
              </tbody>
            </table>
          </div>
          <h6 className='text-center bg-info p-2'>Checkouts Products</h6>
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
                  checkout.products && checkout.products.map((p, index) => {
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

      </div>
    </div>
  )
}
