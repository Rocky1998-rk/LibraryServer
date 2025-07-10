import mongoose  from "mongoose";

const bookSchema =  mongoose.Schema(

  {

  title: {
    type: String,
    required: true,
    trim: true
  },
  
  author: {
    type: String,
    required: true
  },

  genre: {
    type: String
  },

   user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },

  rating: {
    type: Number,
    default: 0
  },
  
  description: {
    type: String
  }

}, 

{ timestamps: true }


);

    const Book = mongoose.model("Book", bookSchema);
    export default Book;
 