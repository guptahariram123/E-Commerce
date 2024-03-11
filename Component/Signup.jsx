import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    var [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })
    var navigate=useNavigate()
    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })

    }
    async function postData(e) {
        e.preventDefault()
        var response=await fetch("/user")
        response=await response.json()
        var item=response.find((x)=>x.username===data.username)
        if(item)
        alert("Username already Exists!!!")
        else{
            if(data.password===data.cpassword){
                var item = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    username: data.username,
                    password: data.password,
                    role: "User"
                }
                response = await fetch("/user", {
                    method: "post",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(item)
                })
                response=await response.json()
                navigate("/login")
               }
               else
               alert("Password and Confirm Password Doesn't Matched !!!")
        }

       
    }
    return (
        <div className="container-fluid">
            <div className="w-75 m-auto">
                <h5 className='bg-info text-center p-2'><span className='text-warning'>Create</span> New Account</h5>
                <form onSubmit={postData}>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label>Name</label>
                            <input type="text" required onChange={getInputData} name='name' placeholder='Enter Full Name:' className='form-control ' />
                        </div>
                        <div className="col-md-6">
                            <label>User Name</label>
                            <input type="text" required onChange={getInputData} name='username' placeholder='Enter Username:' className='form-control' />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label>Email</label>
                            <input type="email" required onChange={getInputData} name='email' placeholder='Enter Email Address:' className='form-control ' />
                        </div>
                        <div className="col-md-6">
                            <label>Phone</label>
                            <input type="number" required onChange={getInputData} name='phone' placeholder='Enter Phone Number :' className='form-control' />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label>Password</label>
                            <input type="password" required onChange={getInputData} name='password' placeholder='Enter Password:' className='form-control ' />
                        </div>
                        <div className="col-md-6">
                            <label>Confirm Password</label>
                            <input type="password" required onChange={getInputData} name='cpassword' placeholder='Confirm Password:' className='form-control' />
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type='submit' className='btn btn-success w-100'>Signup</button>
                    </div>
                </form>
                <Link to="/login" className='text-info'>Already User? Login To Your Account </Link>

            </div>

        </div>
    )
}
