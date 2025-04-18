import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './component/navbar/navbar'
import Home from './component/home/Home'
import Footer from './component/footer/Footer'
import About from './component/about/About'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './component/signUp/SignUp'
import Signin from './component/signUp/Signin'
import Todo from './component/Todos/Todo'
import { authActions } from './store'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
  if (id) {
    dispatch(authActions.login());
  }
    
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element = {<Home />} />
          <Route  path="/about" element = {<About />} />
          <Route  path="/todo" element = {<Todo/>} />
          <Route  path="/signUp" element = {<SignUp/>} />
          <Route  path="/signin" element = {<Signin />} />
        </Routes>
      </Router>

      <Footer></Footer>
    </>
  )
}

export default App
