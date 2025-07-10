import { User } from "../Models/user.models.js";
import Book  from '../Models/book.model.js'
import  { Borrow } from "../Models/borrow.model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";




//////// Signup Controller here ////////

const signupController = async (req , res) => {

try {
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
    
    } catch (error) {

    res.status(500).json({message:"failed to load Api"})
    console.log(error.message)

    }
    
};



///////// Login Controller Here /////////


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email:", email, "Password:", password);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }

    const result = await bcrypt.compare(password, existingUser.password);
    console.log("result:", result);

    if (!result) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { name: existingUser.name, id: existingUser._id },
      "Rocky",
      { expiresIn: "3h" }
    );

    res.setHeader("authorization", `Bearer ${token}`);

    res.status(200).json({
      message: "Successfully logged in",
      existingUser: existingUser,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "failed to load Api", error: error.message });
  }
};




//////// Books Controller Here ///////

const booksController = async (req, res) => {

    try {
        const book = await Book.find();
        res.status(200).json(book)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"failed to load Api"})
    }

}


//////// BorrowBooks Controller Here ///////

const borrowBooksController = async (req, res) => {

try {
    const { userId, bookId } = req.body

    const alreadyBorrowed = await Borrow.findOne({
      bookId, 
      returnDate: null,
    });

    if (alreadyBorrowed) {
      return res.status(400).json({ message: "Book already borrowed by someone else." });
    }

    const book = await Book.findById(bookId);
    const genre = book.genre;

    const borrowedSameGenre = await Borrow.find({
      userId,
      returnDate: null,
    }).populate("bookId");

    const countSameGenre = borrowedSameGenre.filter(
      (borrow) => borrow.bookId.genre === genre
    ).length;

    if (countSameGenre >= 3) {
      return res.status(400).json({ message: `You already borrowed 3 books from "${genre}" genre.` });
    }

    //  due date 7 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const borrow = new Borrow({
      userId,
      bookId,
      dueDate,
    });

    await borrow.save();
    res.status(200).json({ message: "Book borrowed successfully.", borrow });
  } catch (error) {
    res.status(500).json({ message: "Borrow failed.", error: error.message });
  }
};



///////  All Currently Borrowed Books Controller ////////

 const getBorrowedBooksByUser = async (req, res) => {

  try {
    const { userId }  = req.params;

    const borrowedBooks = await Borrow.find({
      userId: userId,
      returnedAt: null
    }).populate("bookId");

    res.status(200).json({ message:" All Borrowed Books Data successfully.", borrowedBooks:borrowedBooks });

  } catch (error) {
     console.error("Error in getBorrowedBooksByUser:", error.message);
    res.status(500).json({ message: "Could not fetch borrowed books." });
  }
};





//////// ReturnBooks Controller Here ///////

const returnBookController = async (req, res) => {

    try {

      console.log("Received body:", req.body);
      const {userId , borrowId}  = req.body

    if (!userId || !borrowId) {
      return res.status(400).json({ message: "Missing userId or borrowId" });
    }

    const borrow = await Borrow.findOne({
        _id:borrowId,
        userId:userId,
      returnDate: null,
    });

    if (!borrow) {
      return res.status(400).json({ message: "Book not borrowed or already returned." });
    }

    borrow.returnDate = new Date();
    await borrow.save();

    console.log("Book returned:", borrow._id);
    res.status(200).json({ message: "Book returned successfully." });

  } catch (error) {
    console.log("Error:", error.message)
    res.status(500).json({ message: "Return failed.", error: error.message });
  }

}

// ///// Borrow history Controller //////

 const getBorrowHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await Borrow.find({ userId }).populate("bookId  userId");
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch borrow history.", error: error.message });
  }
};





// ////// Overdue Books Controller ////////

const getOverdueBooks = async (req, res) => {

  try {
    const today = new Date(); 
    const overdueBooks = await Borrow.find({
       dueDate: { $lt: today },
       returnDate: null
    }).populate("userId bookId");

    res.status(200).json({message: "overdue books Data Successfully", overdueBooks: overdueBooks});

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Failed to get overdue books." });
  }
};





export{signupController, loginController, booksController, borrowBooksController,getBorrowedBooksByUser,returnBookController, getBorrowHistory, getOverdueBooks}