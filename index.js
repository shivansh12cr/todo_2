const express = require("express");
require("./connection/conn");
const path = require("path")
const cors = require("cors");
const auth = require("./router/router");
const list = require("./router/list");


const app = express();
app.use(express.json());
app.use(cors());
// app.get("/",(req,res)=>{
//     res.send("hello");
// })
app.use("/api/v1",auth)
app.use("/api/v2",list);



app.get("/*", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.listen((3000),()=>{
    console.log("port is listing at 3000");
})
