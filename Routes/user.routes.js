import express from "express";
import { loginController, signupController } from "../Controller/user.controller.js";



export const Route = express.Router()

Route.post("/signup", signupController);
Route.post("/login", loginController);