import React from 'react'
import "./home.css"
const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column"> 
        <h1 className='text-center'>
          organiser your <br></br>
          work and life with us.
          </h1>
          <p>
            organise your work with us<br></br> #1 todo app in the world!!
          </p>
        <button class="home-btn pd-2">make to todo</button>
      </div>
    </div>
  )
}

export default Home