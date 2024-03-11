import React from 'react'
import { Link } from 'react-router-dom'

export default function SideNavbar() {
  return (
    <>
    <div className="list-group">
  <Link to="/admin" className="list-group-item list-group-item-action active">
    Admin
  </Link>
  <Link to="/admin-users" className="list-group-item list-group-item-action">Users</Link>
  <Link to="/admin-maincategories" className="list-group-item list-group-item-action">Maincategory</Link>
  <Link to="/admin-subcategories" className="list-group-item list-group-item-action">Subcategory</Link>
  <Link to="/admin-brands" className="list-group-item list-group-item-action">Brands</Link>
  <Link to="/admin-products" className="list-group-item list-group-item-action">Products</Link>
  <Link to="/admin-contacts" className="list-group-item list-group-item-action">Contact</Link>
  <Link to="/admin-checkouts" className="list-group-item list-group-item-action">Checkout</Link>
  <Link to="/admin-newslatters" className="list-group-item list-group-item-action">Newsletter</Link>
  
</div>
    </>
  )
}
