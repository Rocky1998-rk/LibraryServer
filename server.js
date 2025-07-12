// import express from "express"
// import dotenv from 'dotenv'
// import dbConnect from './DataBase/db.js'
// import { Route } from "./Routes/user.routes.js";
// import cors from 'cors'

// const app = express();
// const PORT = process.env.PORT || 5000
// dotenv.config();

// // app.use(cors({
// //   origin: ["http://localhost:5173", "https://local-library-portal-full-stack-dev.vercel.app"], 
// //   credentials:true,
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// //   exposedHeaders:["Authorization"]
// // }));

//    app.use(express.json());

//    const allowedOrigins = [
//   "http://localhost:5174","https://local-library-portal-full-stack-dev.vercel.app"]

//   app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like Postman) or whitelisted
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
//   exposedHeaders: ["Authorization"]
// }));

// app.use("/api", Route);

// // Connect to MongoDB
// (async function dataBase(){
//   await dbConnect();
//   app.listen(PORT,() => console.log(`server has started : ${PORT}`));
// })();

import express from "express";
import dotenv from 'dotenv';
import dbConnect from './DataBase/db.js';
import { Route } from "./Routes/user.routes.js";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//  Use static CORS config
app.use(cors({
  origin:"https://local-library-portal-full-stack-dev.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  exposedHeaders: ["Authorization"]
}));


// ✅ API Routes
app.use("/api", Route);


// ✅ DB + Start Server
(async function () {
  await dbConnect();
  app.listen(PORT, () => console.log(`server has started : ${PORT}`));
})();

