import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';




const Update = ({display,update}) => {
  

  const [Input,setInput] = useState({title:"",body:""});
  useEffect(() => {
    setInput({
      title: update.title,
      body: update.body
    });
  }, [update]);
  const change = (e)=>{
    const {name,value} = e.target;
    setInput({...Input,[name]:value});
 }
 const submit = async()=>{
  await axios
  .put(`${window.location.origin}/api/v2/updatetask/${update._id}`,Input)
  .then((res)=>{
    toast.success(res.data.msg);
  })
  display("none");
 }
  return (
    <div>
        <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
            <h3>Update your task</h3>
            <input type="text" className="todo-input my-3 w-100 p-3 " name="title" value={Input.title} onChange={change}></input>
            <textarea className='todo-input w-100 my-4' name="body" value={Input.body} onChange={change}></textarea>
            <div>
            <button className="btn btn-dark my-4"onClick={submit}>Update</button>
            <button className="btn btn-danger my-4 mx-3" onClick={()=>{
              display("none");
            }}>Close</button>
            </div>
            
        </div>
    </div>
  )
}

export default Update