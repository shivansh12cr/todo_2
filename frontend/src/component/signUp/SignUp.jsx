import React from 'react';
import "./signin.css";
import Headingcomp from './headingcomp';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const SignUp = () => {
  
  const history = useNavigate();
  const [Input,setInput] = useState({
    email :"",
    username : "",
    password : ""
  })
  const change = (e)=>{
    const {name,value} = e.target;
    setInput({...Input,[name]:value});
  }
  const submit = async (e)=>{
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/v1/register`,Input)
    .then((res)=>{
      alert(res.data.msg);
      setInput({
        email :"",
        username : "",
        password : ""
      })
      history("/signin");
    })
    
  }
  return (
    <div className="signin">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5" >
            <input className="p-2 my-2" type="email" name ="email" placeholder="enter your email " onChange={change} value={Input.email}></input>
            <input className="p-2 my-2" type="username" name ="username" placeholder="enter your username " onChange={change} value={Input.username}></input>
            <input className="p-2 my-2" type="password" name ="password" placeholder="enter your password " onChange={change} value={Input.password}></input>
            <button className="btn-signUp"onClick={submit}>SignUp</button>
            </div>
            
          </div>
          <div className=" col-lg-4 column  d-lg-flex justify-content-center align-items-center ram d-none">
          <Headingcomp first="Sign" second="Up"></Headingcomp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
