import React, { useEffect, useState } from 'react'
import { Link, useFetcher, useNavigate } from 'react-router-dom'

export default function Navbar(props) {
    var navigate = useNavigate()
    let[search,setSearch]=useState("")
    // const [searchValue,setSearchValue]=useState("")
    // const [finalFilter,setFinalFilter]=useState([])
    function logout() {
        localStorage.clear()
        navigate("/login")

    }
    function getInputData(e){
        setSearch(e.target.value)
    }
    function postData(e){
        e.preventDefault()
        props.changeSearch(search)
        setSearch("")
    }
//     const ArryFilter=[]
// const chandleChange=(e)=>{
//     setSearchValue(e.target.value)
// }
// const serchFilert=()=>{

//     // const filtervalue=ArryFilter.filter((user) => {
//     //     return user.name.toLowerCase().startsWith(keyword.toLowerCase());
//     //     // Use the toLowerCase() method to make it case-insensitive
//     //   });
//     if(searchValue == ""){
//         setFinalFilter(ArryFilter)
//     }
//     else{
//         const filtervalue=ArryFilter.filter((user) => {
//             return user.name.toLowerCase() == searchValue.toLowerCase();
//             // Use the toLowerCase() method to make it case-insensitive
//           });

// setFinalFilter(filtervalue)
//     }
    

// }
// useEffect(()=>{
//     serchFilert()
// },[searchValue])

    return (
        <>
            <div className="container-fluid">

                <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                    <div className="col-lg-4">
                        <Link to="/" className="text-decoration-none">
                            <span className="h1 text-uppercase text-primary bg-dark px-2">E</span>
                            <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Commerce</span>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-6 text-left">
                        <form action="" onSubmit={(e)=>postData(e)}>
                            <div className="input-group">
                                <input type="search" name='search' value={search} onChange={(e)=>getInputData(e)} className="form-control"  placeholder="Search for products" />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search" type='submit'></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 col-6  text-right  " >
                        <p  className="m-0">Customer Service</p>
                        <h5 className="m-0">+91 9794196128</h5>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark mb-30 sticky-top">
                <div className="row px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: "65px", padding: "0 30px" }}>
                            <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                            <i className="fa fa-angle-down text-dark"></i>
                        </a>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: "calc(100% - 30px)", zIndex: "999" }}>
                            <div className="navbar-nav w-100">
                                <div className="nav-item dropdown dropright">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Dresses <i className="fa fa-angle-right float-right mt-1"></i></a>
                                    <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                        <a href="" className="dropdown-item">Men's Dresses</a>
                                        <a href="" className="dropdown-item">Women's Dresses</a>
                                        <a href="" className="dropdown-item">Baby's Dresses</a>
                                    </div>
                                </div>
                                <a href="" className="nav-item nav-link">Shirts</a>
                                <a href="" className="nav-item nav-link">Jeans</a>
                                <a href="" className="nav-item nav-link">Swimwear</a>
                                <a href="" className="nav-item nav-link">Sleepwear</a>
                                <a href="" className="nav-item nav-link">Sportswear</a>
                                <a href="" className="nav-item nav-link">Jumpsuits</a>
                                <a href="" className="nav-item nav-link">Blazers</a>
                                <a href="" className="nav-item nav-link">Jackets</a>
                                <a href="" className="nav-item nav-link">Shoes</a>
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2">E</span>
                                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Commerce</span>
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to="/" className="nav-item nav-link active">Home</Link>
                                    <Link to="/shop/All/All/All" className="nav-item nav-link">Shop</Link>

                                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                                    <Link to="/admin" className="nav-item nav-link">Admin</Link>

                                </div>
                                <div className="navbar-nav ml-auto py-0 ">

                                    {
                                        localStorage.getItem("login") ?
                                            <div className="nav-item dropdown">
                                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">{localStorage.getItem("name")}<i className="fa fa-angle-down mt-1"></i></a>
                                                <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                                    {
                                                        localStorage.getItem("role") === ("Admin") ?
                                                            <>
                                                                <Link to="/admin" className="dropdown-item">Profile</Link>
                                                                
                                                            </> :
                                                            <>
                                                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                                                <Link to="/cart" className="dropdown-item">Cart</Link>
                                                            </>
                                                    }
                                                    <button className="dropdown-item" onClick={logout}>Logout</button>
                                                </div>
                                            </div> :
                                            <Link to="/login" className="nav-item nav-link">Login</Link>
                                    }
                                </div>

                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>

    )
}
