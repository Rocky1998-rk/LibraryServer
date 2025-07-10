import mongoose, { Schema } from "mongoose";

  const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is a required field"],
        },

        email:{
            type:String,
            required:[true,"email is a required field"],
            unique:true,
        },

        password:{
            type:String,
            required:[true,"password is a required field"],
            unique:true,
        },

          book:{
            type:[mongoose.Schema.Types.ObjectId],
            ref:"Book"
        },

    },

    {timestamps:true}

)

export const User = mongoose.model("User", userSchema);