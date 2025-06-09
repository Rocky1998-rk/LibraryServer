import express from "express"
import dotenv from 'dotenv'
import dbConnect from './DataBase/db.js'
import { Route } from "./Routes/user.routes.js";
import cors from 'cors'

const app = express();


dotenv.config();
const PORT = process.env.PORT || 5000



app.use(cors());

// Connect to MongoDB

(async function dataBase(){
    await dbConnect();
    app.listen(PORT,() => console.log(`server has started : ${PORT}`));
})();

app.use(express.json());
app.use("/api", Route);