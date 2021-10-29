import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoute from "./routes/userRoutes";
import adminRoute from "./routes/adminRoutes";
import loginRoute from "./routes/loginRoutes";
 
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", loginRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

mongoose
   .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then((res) => {
      console.log(`Connected to the Data-Base `);
      app.listen(process.env.PORT, () => {
         console.log(`Server Running on Port ${process.env.PORT}`);
      });
   })
   .catch((err) => {
      console.log(`ERROR::: ${err}`);
   });

app.get("/", (req, res) => {
   res.send("Tested ok server..!");
});
