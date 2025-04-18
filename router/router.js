const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const userSchema = require("./zod");

const router = express.Router();

// router.post("/register", async (req, res) => {
//     try {
        
//         const parsedData = userSchema.parse(req.body);

       
//         const hashedPassword = await bcrypt.hash(parsedData.password, 10);

       
//         parsedData.password = hashedPassword;

       
//         const newUser = new User(parsedData);
//         await newUser.save();

//         res.status(200).json({ msg : "signUp succfully" });
//     } catch (error) {
//         if (error.name === "ZodError") {
//             return res.status(400).json({ msg: "user already exists", errors: error.errors });
//         }
//         res.status(500).json({ msg: "Internal server error", error: error.message });
//     }
// });
router.post("/register", async (req, res) => {
  try {
      
      const parsedData = userSchema.parse(req.body);

      
      const existingUser = await User.findOne({ email: parsedData.email });
      if (existingUser) {
          return res.status(200).json({ msg: "User with this email already exists" });
      }

      
      const hashedPassword = await bcrypt.hash(parsedData.password, 10);
      parsedData.password = hashedPassword;

      
      const newUser = new User(parsedData);
      await newUser.save();

      res.status(200).json({ msg: "Sign-up successful" });
  } catch (error) {
      
      if (error.name === "ZodError") {
          return res.status(200).json({ msg: "Validation failed", errors: error.errors });
      }
      
      
      res.status(200).json({ msg: "Internal server error", error: error.message });
  }
});

router.post("/signin", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(200).json({ msg: "Sign up first!" });
      }
  
      const password_check = bcrypt.compareSync(req.body.password, user.password);
      if (!password_check) {
        return res.status(200).json({ msg: "Wrong password" });
      }
  
      const { password, ...others } = user._doc;
      return res.status(200).json({ others });
  
    } catch (error) {
      return res.status(200).json({ msg: "Something went wrong", error: error.message });
    }
  });

module.exports = router;
