import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({

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

  rating: {
    type: Number,
    default: 0
  },
  
  description: {
    type: String
  }

}, 

{ timestamps: true });

module.exports = mongoose.model("Book", bookSchema);