
// assignBooksToMultipleUsers.js
import mongoose from "mongoose";
import Book from "./Models/book.model.js";
import { User } from "./Models/user.models.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const run = async () => {
  try{
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");

    const users = await User.find();
    if (users.length === 0) {
      console.log("No users found.");
      return;
    }

    const books = await Book.find({ user: { $exists: false } });
    if (books.length === 0) {
      console.log("No unlinked books found.");
      return;
    }

    let userIndex = 0;

    for (const book of books) {
      const currentUser = users[userIndex];
      book.user = currentUser._id;
      await book.save();

      await User.findByIdAndUpdate(currentUser._id, {
        $addToSet: { book: book._id },
      });

      userIndex = (userIndex + 1) % users.length;
    }

    console.log(`${books.length} books assigned to ${users.length} users.`);
    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);
    mongoose.disconnect();
  }
};

run();
