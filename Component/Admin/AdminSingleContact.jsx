
import React, { useEffect, useState } from 'react'
import SideNavbar from './SideNavbar'
import { useNavigate, useParams } from 'react-router-dom'

import { getContactUs, deleteContactUs, updateContactUs } from "../../Store/ActionCreators/ContactUsActionCreators"
import { useDispatch, useSelector } from 'react-redux';

export default function AdminSingleContact() {
  var [contact, setContact] = useState({})
  var dispatch = useDispatch()
  var allContacts = useSelector((state) => state.ContactUsStateData)
  var navigate = useNavigate()
  var { id } = useParams()
  function getAPIData() {
    dispatch(getContactUs())
    if (allContacts.length) {
      setContact(allContacts.find((x) => x.id == id))
    }
  }
  function updateItem() {
    dispatch(updateContactUs({ ...contact, status: "Done" }))
    setContact((old) => {
      return {
        ...old,
        ['status']: "Done"
      }
    })
  }
  function deleteItem() {
    dispatch(deleteContactUs({ id: id }))
    navigate("/admin-contacts")
  }
  useEffect(() => {
    getAPIData()
  }, [allContacts.length])
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-12">
          <SideNavbar />
        </div>

        <div className="col-md-9 col-12">
          <h4 className='text-center bg-primary p-2'>Contact</h4>
          <div className="table-responsive">
            <div className="table table-bordered">
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>{contact.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{contact.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{contact.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{contact.phone}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{contact.date}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{contact.status}</td>
                  </tr>
                  <tr>
                    {
                      contact.status === "Active" ?
                        <td colSpan={2}><button className='btn bg-primary w-100' onClick={updateItem}>Update Status to Done</button></td>
                        :
                        <td colSpan={2}><button className='btn bg-primary w-100' onClick={deleteItem}>Delete</button></td>
                    }
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
