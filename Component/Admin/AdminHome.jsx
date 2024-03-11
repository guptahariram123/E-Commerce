import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SideNavbar from './SideNavbar'


export default function AdminHome() {
    var navigate = useNavigate()
    var [user, setUser] = useState({})
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
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-12">
                        <SideNavbar />
                    </div>

                    <div className="col-md-9 col-12">
                        <div className="row">
                            <div className="col-md-6">
                                {
                                    user.pic ?
                                        <img src={`/assets/images/${user.pic}`} height="600px" width="100%" alt="" /> :
                                        <img src={`/assets/images/mine.jpg`} height="600px" width="100%" alt="" />
                                }
                            </div>
                            <div className="col-md-6">
                                <h4 className='text-center bg-primary p-2'>Admin Profile</h4>
                                <table className='table'>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th>User Name</th>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <th>Role</th>
                                            <td>{user.role}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td>{user.phone}</td>
                                        </tr>
                                        <tr>
                                            <th colSpan={2}><Link to="/update-profile" className='btn btn-primary w-100'>Update Profile</Link></th>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
