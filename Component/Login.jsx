import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    var[data,setData]=useState({
        username:"",
        password:""
    })
    var navigate =useNavigate()
    function getInputData(e){
        var{name,value}=e.target
        setData((old)=>{
            return{
                ...old,
                [name]:value
            }
        })

    }
    async function postData(e){
        e.preventDefault()
        var response=await fetch("/user")
        response=await response.json()
        var item=response.find((x)=>x.username===data.username && x.password===data.password)
        if(item){
         localStorage.setItem("login",true)
         localStorage.setItem("username",item.username)
         localStorage.setItem("name",item.name)
         localStorage.setItem("userid",item.id)
         localStorage.setItem("role",item.role)
         if(item.role==="Admin")
         navigate("/admin")
         else
         navigate("/profile")
        }
        else 
        alert("Invalid Username or Password !!!")
    }
  return (
    <div className="container-fluid">
        <div className="w-50 m-auto">
        <h5 className='bg-info text-center p-2'><span className='text-warning'>Login</span> To Your Account</h5>
        <form onSubmit={postData}>
            <div className="mb-3">
                <label>User Name</label>
                <input type="text" required onChange={getInputData} name='username' placeholder='Enter Your Name:' className='form-control' />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input type="password" required onChange={getInputData} name='password' placeholder='Enter Your Password:' className='form-control' />
            </div>
            <div className="mb-3">
                <button type='submit'className='btn btn-success w-100'>Login</button>
            </div>
            <div className='d-flex justify-content-between'>
            <Link to="#" className='text-info'>Forget Password</Link>
            <Link to="/signup" className='text-info'>New User? Create Account </Link>
        </div>
        </form>
        </div>
        
    </div>
  )
}
