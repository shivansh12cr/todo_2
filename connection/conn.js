const mongoose = require("mongoose");

const conn = async (req,res)=>{
    await mongoose.connect("mongodb+srv://2022uec1637:Shivansh%40990@cluster0.i4iu2.mongodb.net/todo_1")
        .then(()=>{
            console.log("connected");
        });
}

conn();