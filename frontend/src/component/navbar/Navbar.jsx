import React from 'react'
import "./navbar.css";
import { LuNotebookText } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Navbar = () => {
  const isLoggedIn = useSelector((state)=> state.isLoggedIn);
  const dispatch = useDispatch();
  const logout = ()=>{
    sessionStorage.clear("id")
    dispatch(authActions.logout());
  }
  return (
    <div><nav className="navbar navbar-expand-lg">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <b>
        <LuNotebookText />todo
            </b>
      </Link>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-Link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-Link active" aria-current="page" to="/about">about us</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-Link active" aria-current="page" to="/todo">todo</Link>
          </li>
          {!isLoggedIn && < >
            <li className="nav-item mx-2">
            <Link className="nav-Link active btn-nav my-2" aria-current="page" to="/signUp">signUp</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-Link active btn-nav" aria-current="page" to="/signin">signin</Link> 
          </li>
          </>
          }
          {isLoggedIn && <>
            <li className="nav-item mx-2" onClick={logout}>
            <Link className="nav-Link active btn-nav" aria-current="page" to="#">logout</Link>
          </li>
          <li className="nav-item mx-2 "  onClick={logout}>
            <Link className="nav-Link active" aria-current="page" to="/">
                <img className="img-fuild user-png" src ="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"></img>
            </Link>
          </li>
          </>}
          
          
        </ul>
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar