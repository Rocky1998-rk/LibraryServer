import { User } from "../Models/user.models.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";




//////// Signup Controller here ////////

const signupController = async (req , res) => {

    const {name, email, password} = req.body
    if (!name || !email || !password) {
        return res.status(400).json({message:"all fields are required"})
    }

    const existingUser = await User.find({email});
    if (existingUser.length > 0) {
            return res.status(400).json({message:"Email already in Use"})
        }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
            name,
            email,
            password:hashedPassword,
        });

    await user.save();
    res.status(200).json({message:"User details Success", userDetails: user})
};



///////// Login Controller here /////////


const loginController = async (req, res) => {
    

        const {email, password} = req.body;
        console.log("Email:", email, "Password:", password);

        if(!email || !password){
            return res.status(400).json({message:"all fields are required"})
        }

        const existingUser = await User.findOne({email});

        if(existingUser.email !== email){
            return res.status(401).json({message:"Incorrect Email"})
        }

       if (!existingUser) {
        return res.status(404).json({message:"User Not found Signup please"})

      }
        const result = await bcrypt.compare(password, existingUser.password);
        console.log("result:", result);

        if(!result){
            return res.status(401).json({message:"Incorrect Password"})
        }

        const token = jwt.sign({name:existingUser.name, id:existingUser._id},"Rocky", {expiresIn : "3h"});
        res.setHeader("authorization",`Bearer ${token}`);

        res.status(200).json({message:"Successfully Login User", existingUser: existingUser})
        
};









export{signupController, loginController}