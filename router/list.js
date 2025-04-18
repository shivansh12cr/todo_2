const User = require("../model/user");
const List = require("../model/list");

const router = require("express").Router();

router.post("/addtask",async (req,res)=>{
    
    try {
        const {title,body,id} = req.body;
        const existinguser = await User.findById(id)
    if(existinguser){
        const list  = new List({title,body,user :existinguser});
        await list.save().then(()=>res.status(200).json(list));
        existinguser.list.push(list);
        existinguser.save();
    }
    } catch (error) {
        console.log(error);
    }
})

// router.put("/updatetask/:id",async (req,res)=>{
    
//     try {
//         const {title,body} = req.body;
//         const list = await List.findByIdAndUpdate(req.params.id,{title,body});
//         list.save().then(()=>{res.status(200).json({msg:"updated task"})})
//     }
//      catch (error) {
//         console.log(error);
//     }
// })

router.put("/updatetask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;

        const list = await List.findByIdAndUpdate(
            req.params.id,
            { title, body },
            { new: true } // return updated document
        );

        if (list) {
            res.status(200).json({ msg: "updated task", list });
        } else {
            res.status(200).json({ msg: "Task not found" });
        }
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(200).json({ msg: "Server error" });
    }
});

router.delete("/deletetask/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.body.id;

        if (!userId) {
            return res.status(200).json({ msg: "User ID required in request body" });
        }

        // Remove task ID from the user's list array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { list: taskId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(200).json({ msg: "User not found" });
        }

        // Delete the task from the List collection
        await List.findByIdAndDelete(taskId);

        res.status(200).json({ msg: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.get("/gettask/:id",async(req,res)=>{
    const list = await List.find({user:req.params.id});
    if(list.length!=0){
        res.status(200).json({list:list});
    }
    else{
        res.status(200).json({msg:"no task added!!"})
    }
    
})

module.exports = router