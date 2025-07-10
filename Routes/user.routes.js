import express from "express";
import { booksController, borrowBooksController, getBorrowedBooksByUser, getBorrowHistory, getOverdueBooks, loginController, returnBookController, signupController } from "../Controller/user.controller.js";



export const Route = express.Router()

Route.post("/signup", signupController);
Route.post("/login", loginController);
Route.get("/books", booksController);
Route.post("/borrow", borrowBooksController);
Route.get("/borrowed/:userId", getBorrowedBooksByUser);
Route.get("/history/:userId", getBorrowHistory);
Route.get("/overdue", getOverdueBooks);
Route.post("/returnBook", returnBookController);