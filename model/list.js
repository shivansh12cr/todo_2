const mongoose = require("mongoose");

const listschema = mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    body :{
        type : String,
        required : true
    },
    user : [
        {
            type : mongoose.Types.ObjectId,
            ref : "user"
        }
    ]
})

module.exports = mongoose.model("list",listschema)
