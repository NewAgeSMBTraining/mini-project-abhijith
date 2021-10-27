import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { LoginModel } from "../models/DBmodel";

//GET A DATA
export const getData = async (req, res) => {
   const { id } = req.params;
   try {
      const data = await LoginModel.findById(id);
      res.status(201).json({ status: "ok", user: data });
   } catch (error) {
      res.status(409).json({ status: "error", error: error });
   }
};

//LOGIN
export const Login = async (req, res) => {
   const loginData = req.body;
   console.log(loginData.username);
   console.log(loginData.password);
   console.log(process.env.JWT_SECRET);
   console.log(typeof process.env.JWT_SECRET);
   try {
      const user = await LoginModel.findOne({
         username: loginData.username,
      });

      if (!user) {
         return res.status(409).json({ status: "error", error: "Invalid username" });
      }

      const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

      if (isPasswordValid) {
         const token = jwt.sign(
            {
               name: user.name,
               email: user.username,
            },
            process.env.JWT_SECRET
         );
         return res.status(201).json({ status: "ok", token: token, user: user });
      } else {
         res.status(409).json({ status: "error", error: "Invalid Password" });
      }
   } catch (error) {
      res.status(409).json({ status: "error", message: "password....wrong" });
   }
};

//RESET PASSWORD
export const resetPassword = async (req, res) => {
   const user_data = req.body;
   const newPassword = req.body.new_password;
   console.log(newPassword);
   console.log(user_data);
   try {
      const hashPassword = await bcrypt.hash(req.body.new_password, 10);
      console.log(hashPassword);
      const loginData = await LoginModel.findOneAndUpdate(
         { username: req.body.username } && {
            name: `${req.body.first_name} ${req.body.last_name}`,
         },
         { password: hashPassword }
      );
      console.log(loginData);

      if (loginData) {
         res.status(201).json({ status: "ok" });
      } else {
         res.status(409).json({ status: "error", message: error.message });
      }
   } catch (error) {
      res.status(409).json({ status: "error", message: error.message });
   }
};
