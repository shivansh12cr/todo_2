import React from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
const Todocards = ({title,body,id,delid,display,updateId,tobeupdated}) => {
  return (
    <div className="p-3 todo-card">
        <div>
        <h5>{title}</h5>
        <p>{body}</p>
        </div>
        
        <div className="d-flex justify-content-between ">
            <div className="d-flex justify-content-between icon-head px-2 py-1 "onClick={()=>{
                display("block");
                tobeupdated(updateId)
            }}><MdFileUpload className="icon  icon-head-1"/>Update</div>
            <div className="d-flex justify-content-between icon-head px-2 py-1 text-danger "onClick={function(){
                delid(id);
            }}><MdDeleteOutline className="icon del icon-head-1" />Delete</div>
        </div>
        
    </div>
    
  );
};

export default Todocards;
