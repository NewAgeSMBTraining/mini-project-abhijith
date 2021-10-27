import { UserModel, LoginModel, LeaveModel } from "../models/DBmodel";
import jwt from "jsonwebtoken";

//USER LOGIN
export const userLogin = async (req, res) => {
   const user_data = req.body;
   console.log(user_data);
   const login = new LoginModel(user_data);

   try {
      await login.save();
      res.status(201).json(login);
   } catch (error) {
      console.log(error.message);
      res.status(409).json({ message: error.message });
   }
};
//USER LEAVE
export const leave = async (req, res) => {
   const user_data = req.body;
   console.log(user_data);
   const login = new LeaveModel(user_data);

   try {
      await login.save();
      res.status(201).json(login);
   } catch (error) {
      console.log(error.message);
      res.status(409).json({ message: error.message });
   }
};
//GET A USER DATA BY ID
export const getProfileID = async (req, res) => {
   const { id } = req.params;
   //JWT TOKEN AUTH
   const token = req.headers["x-access-token"];
   const decode = jwt.verify(token, process.env.JWT_SECRET);
   try {
      if (decode) {
         const user = await UserModel.findById(id);
         res.status(201).json({ ststus: "ok", user });
      }
   } catch (error) {
      res.status(409).json({ ststus: "error", message: error.message });
   }
};
//GET DATA BY USERNAME
export const getProfileUserName = async (req, res) => {
   const { username } = req.params;
   try {
      const user = await UserModel.findOne({ username: username });
      res.status(201).json({ ststus: "ok", user });
   } catch (error) {
      res.status(409).json({ ststus: "error", message: error.message });
   }
};

//GET USER LEAVE REQ
export const getUserLeaveReq = async (req, res) => {
   const { username } = req.params;
   console.log(username);
   try {
      const LeaveData = await LeaveModel.find({ username: username });
      console.log(LeaveData);
      res.status(200).json({ status: "ok", user: LeaveData });
   } catch (error) {
      res.status(409).json({ status: "error", error: error.message });
   }
};
