import React, { useEffect, useState } from 'react'
import "./todo.css";
import Todocards from './todocards';

import { ToastContainer, toast } from 'react-toastify';
import Update from './Update';
import axios from 'axios';

let toupdatedArray=[];
const Todo = () => {
    let id = sessionStorage.getItem("id");
    const [Input,setInput] = useState({title :"",body :""})
    const [array,setarray] = useState([]);

    const update =(value)=>{
        toupdatedArray=array[value];
    }

    const show=() =>{
        document.getElementById("textarea").style.display="block"
    }
    const change = (e)=>{
        const {name,value} = e.target;
        setInput({...Input,[name]:value});
    }
    const submit =async ()=>{
        if(Input.title==="" || Input.body==""){
            toast.error("title or body can't be empty")
        }else{
            if(id){
                await axios
                .post(`${window.location.origin}/api/v2/addtask`,{title :Input.title,body:Input.body,id:id})
                .then((res)=>{
                    console.log(res);
                })
                
                setInput({title :"",body :""})
                toast.success("your task is added");
            }
            else{
                setarray([...array,Input])
                setInput({title :"",body :""})
                toast.success("your task is added");
                toast.error("yout task is not saved!!")
            }
        }
        
    }
    const del =async (userId)=>{
        
        if(id){
            await axios
            .delete(`${window.location.origin}/api/v2/deletetask/${userId}`,{data:{id:id}})
            .then(()=>{
                toast("your task is deleted")
            })
        }
        else{
            toast.error("signup first!!")
        }
        
        
        
    }
    const dis =(value)=>{
        document.getElementById("todo-update").style.display=value;
    }
    useEffect(()=>{
        if(id){
            const fetch = async ()=>{
                await axios
                .get(`${window.location.origin}/api/v2/gettask/${id}`)
                .then((res)=>{
                   setarray(res.data.list)
                })
            }
            fetch()
        }
        
    },[submit])

  return (
    <>
    <div className="todo">
        <ToastContainer></ToastContainer>
       <div className="todo-main container d-flex justify-content-start align-items-center my-4 flex-column">
            <div className="d-flex flex-column todo-inputs-div w-50 p-1">
                <input type="text" placeholder="Title" className=" my-2 todo-inputs" onClick={show} name="title" value={Input.title} onChange={change} />
                <textarea id="textarea" placeholder="Body"  className="p-2 todo-inputs" name="body" value={Input.body}  onChange={change} />
            </div>
            <button className='btn-signUp container w-50 p-1 my-2' onClick={submit}>Add task</button>
        </div>
        <div className="todo-body">
            <div className="container-fuild">
                <div className="row">
                    {array &&
                        array.map((item,index)=>{
                        return (<div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                            <Todocards title={item.title} body={item.body} id={item._id} delid={del} display={dis} updateId={index} tobeupdated={update}/>
                        </div>)
                   
                    })}
                </div>
                
            </div>
        </div>
       
    </div>
    <div className="todo-update" id="todo-update">
        <div className="container update">
        <Update display={dis} update={toupdatedArray}></Update>
        </div>
    </div>
    </>
  )
}

export default Todo