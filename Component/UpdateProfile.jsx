import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    var [data, setData] = useState({
        name: "",
        pic: "",
        email: "",
        phone: "",
        addressline1: "",
        addressline2: "",
        addressline3: "",
        pin: "",
        city: "",
        state: "",
    })
    var navigate = useNavigate()
    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })

    }
    function getInputFile(e) {
        var { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })

    }
    async function postData(e) {
        e.preventDefault()
        var item = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            addressline1: data.addressline1,
            addressline2: data.addressline2,
            addressline3: data.addressline3,
            pin: data.pin,
            city: data.city,
            state: data.state,
            username: data.username,
            password: data.password,
            role: data.role,
            pic: data.pic
           
        }
        var response = await fetch("/user/"+data.id, {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        })
        response = await response.json()
        if(data.role==="Admin")
        navigate("/admin")
        else
        navigate("/profile")
    }

    async function getAPIData() {
        var response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response)
            setData(response)
        else
            navigate("/login")
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className="container-fluid">
            <div className="w-75 m-auto">
                <h5 className='bg-info text-center p-2'><span className='text-warning'>Update</span> Your Profile</h5>
                <form onSubmit={postData}>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label>Name</label>
                            <input type="text"  value={data.name} onChange={getInputData} name='name' placeholder='Enter Full Name:' className='form-control ' />
                        </div>
                        <div className="col-md-6">
                            <label>Pic</label>
                            <input type="file"  onChange={getInputFile} name='pic' className='form-control' />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label>Email</label>
                            <input type="email"  value={data.email} onChange={getInputData} name='email' placeholder='Enter Email Address:' className='form-control ' />
                        </div>
                        <div className="col-md-6">
                            <label>Phone</label>
                            <input type="number"  value={data.phone} onChange={getInputData} name='phone' placeholder='Enter Phone Number :' className='form-control' />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label>Address Line1</label>
                            <input type="text"  value={data.addressline1} onChange={getInputData} name='addressline1' placeholder='Enter House No/Plot No.' className='form-control ' />
                        </div>
                        <div className="col-md-6">
                            <label>Address Line 2</label>
                            <input type="text"  value={data.addressline2} onChange={getInputData} name='addressline2' placeholder='Enter Village/Near By' className='form-control' />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label>Address Line3</label>
                            <input type="text"  value={data.addressline3} onChange={getInputData} name='addressline3' placeholder='Enter Street No / Near By' className='form-control ' />
                        </div>
                        <div className="col-md-6">
                            <label>Pin Code</label>
                            <input type="number"  value={data.pin} onChange={getInputData} name='pin' placeholder='Enter Pincode' className='form-control' />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label>City</label>
                            <input type="text"  value={data.city} onChange={getInputData} name='city' placeholder='Enter city Name:' className='form-control ' />
                        </div>
                        <div className="col-md-6">
                            <label>State</label>
                            <input type="text"  value={data.state} onChange={getInputData} name='state' placeholder='Enter state Name:' className='form-control' />
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type='submit' className='btn btn-success w-100'>Update</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
