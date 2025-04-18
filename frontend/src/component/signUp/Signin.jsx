import React from 'react'
import "./signin.css";
import Headingcomp from './headingcomp';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { toast } from 'react-toastify';
      

const Signin = () => {
      const dispatch = useDispatch();
      const history = useNavigate();
      const [Input,setInput] = useState({
        email :"",
        password : ""
      })
      const change = (e)=>{
        const {name,value} = e.target;
        setInput({...Input,[name]:value});
      }
      // const submit = async (e)=>{
      //     e.preventDefault();
      //     await axios.post("http://localhost:3000/api/v1/signin",Input)
      //     .then((res)=>{
      //       sessionStorage.setItem("id",res.data.others._id);
      //       dispatch(authActions.login())
      //       history("/todo")
      //     })}
      const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${window.location.origin}/api/v1/signin`, Input);
            sessionStorage.setItem("id", res.data.others._id);
            dispatch(authActions.login());
            history("/todo");
        } catch (error) {
            if (error.response?.data?.msg) {
              toast.error(error.response.data.msg);
            } else {
              toast.error("Something went wrong");
              }  
        }
    };
  return (
      
    <div><div className="container">
    <div className="row">
    <div className="col-lg-4 column d-flex justify-content-center align-items-center ram">
      <Headingcomp first="Sign" second="In"></Headingcomp>
      </div>
      <div className="col-lg-8 column d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column w-100 p-5" >
        <input className="p-2 my-2" type="email" name ="email" placeholder="enter your email"onChange={change} value={Input.email}></input>
        <input className="p-2 my-2" type="password" name ="password" placeholder="enter your password"onChange={change} value={Input.password}></input>
        <button className="btn-signUp" onClick={submit}>SignUp</button>
        </div>
        
      </div>
      
    </div>
  </div></div>
  )
}

export default Signin