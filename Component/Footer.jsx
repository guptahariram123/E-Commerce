import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getNewslatter, addNewslatter } from "../Store/ActionCreators/NewslatterActionCreators"
import { useDispatch, useSelector } from 'react-redux'

export default function Footer() {
    var [email, setEmail] = useState("")
    var [show, setShow] = useState(false)
    var [message,setMessage]=useState("")
    var allNewslatters = useSelector(state => state.NewslatterStateData)
    var dispatch = useDispatch()
    function getInputData(e) {
        setEmail(e.target.value)
    }
    function postData(e) {
        e.preventDefault()
        var item =  allNewslatters.find((x) => x.email === email)
        if (item){
            setShow(true)
            setMessage("Your Email Id Has Already Exists!!!")
        }
        else {
            dispatch(addNewslatter({ email: email }))
            setShow(true)
            setMessage("Thanks To Suscribe Our Channel")
        }
    }
    function getAPIData() {
        dispatch(getNewslatter())
    }
    useEffect(() => {
        getAPIData()
    }, [allNewslatters.length])
    return (
        <>
            <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
                <div className="row px-xl-5 pt-5">
                    <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                        <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
                        <p className="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
                        <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>sector 15 Noida India</p>
                        <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i><a href="mailto:guptahariram789@gmail.com" target='_blank'>guptahariram789@gmail.com</a></p>
                        <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i><a href="tel:9794196128" target='_blank'>+91 9794196128</a></p>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <div className="row">
                            <div className="col-md-4 mb-5">
                                <h5 className="text-secondary text-uppercase mb-4">Menu</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <Link className="text-secondary mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Home</Link>
                                    <Link className="text-secondary mb-2" to="shop/All/All/All"><i className="fa fa-angle-right mr-2"></i>Our Shop</Link>
                                    <Link className="text-secondary mb-2" to="/cart"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</Link>
                                    <Link className="text-secondary mb-2" to="/checkout"><i className="fa fa-angle-right mr-2"></i>Checkout</Link>
                                    <Link className="text-secondary" to="/contact"><i className="fa fa-angle-right mr-2"></i>Contact Us</Link>
                                </div>
                            </div>
                            <div className="col-md-8 mb-5">
                                <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
                                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                                {
                                    show ? <div class="alert alert-success alert-dismissible fade show" role="alert">
                                        {message}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div> : ""
                                }
                                <form onSubmit={postData}>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name='email' value={email} onChange={getInputData} placeholder="Your Email Address" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary">Subscribe</button>
                                        </div>
                                    </div>
                                </form>
                                <h6 className="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                                <div className="d-flex">
                                    <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    <a className="btn btn-primary btn-square" href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
