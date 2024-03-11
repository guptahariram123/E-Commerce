import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {addContactUs} from "../Store/ActionCreators/ContactUsActionCreators"
import { useDispatch } from 'react-redux'

export default function Contact() {
    var [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: ""
    })
    var[show,setShow]=useState(false)
    var dispatch=useDispatch()
    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
        setShow(false)
    }
    function postData(e) {
        e.preventDefault()
        var item={
            name:data.name,
            email:data.email,
            phone:data.phone,
            subject:data.subject,
            message:data.message,
            status:"Active",
            date:new Date()
        }
        dispatch(addContactUs(item))
        setShow(true)
        setData({
            name: "",
            email: "",
            phone: "",
            message: "",
            subject: ""
        })
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                            <span className="breadcrumb-item active">Contact</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4 text-center " ><span className=" p-1" >Contact Us</span></h2>
                <div className="row px-xl-5">
                    <div className="col-lg-7 mb-5">
                        <div className="bg-light p-30">
                            {
                                show?<div class="alert alert-success alert-dismissible fade show" role="alert">
                                    Thanks to Share your query with Us !!! Our Team will Contact You soon!!!
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                              </div> :""
                            }
                            <form onSubmit={postData} >
                                <div className="control-group mb-2">
                                    <input type="text" className="form-control" value={data.name} name="name" onChange={getInputData} placeholder="Your Name" required />
                                </div>
                                <div className="control-group mb-2">
                                    <input type="email" className="form-control" value={data.email} name="email" onChange={getInputData} placeholder="Your Email"required />
                                </div>
                                <div className="control-group mb-2">
                                    <input type="number" className="form-control" value={data.phone} name="phone" onChange={getInputData} placeholder="Your Phone"required />
                                </div>
                                <div className="control-group mb-2">
                                    <input type="text" className="form-control" value={data.subject} name="subject" onChange={getInputData} placeholder="Subject"required />
                                </div>
                                <div className="control-group mb-2">
                                    <textarea className="form-control" rows="8" value={data.message} name="message" onChange={getInputData} placeholder="Message"required></textarea>
                                </div>
                                <div>
                                    <button className="btn btn-primary py-2 px-4 w-100" type="submit" >Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-5">
                        <div className="bg-light p-30 mb-30">
                            <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="300px" id="gmap_canvas" src="https://maps.google.com/maps?q=nayabas%20noida%20sector%2016&t=k&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
                        </div>
                        <div className="bg-light p-30 mb-3">
                            <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i> Sector 15 Noida India</p>
                            <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i><a href="mailto:ghariram052@gmail.com" className='text-dark' target='_blank'>ghariram052@gmail.com</a></p>
                            <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3"></i><a href="tel:9794196128" className='text-dark' target='_blank'>+91 9794196128</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
