const mongoose = require("mongoose");

const listschema = mongoose.Schema({
    email :{
        type : String,
        required : true
    },
    username :{
        type : String
    },
    password :{
        type : String,
        required : true
    },list : [
            {
                type : mongoose.Types.ObjectId,
                ref : "list"
            }
        ]
})

module.exports = mongoose.model("user",listschema)
