import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

import { UserModel, LoginModel, LeaveModel } from "../models/DBmodel";

export const getAdmin = (req, res) => {
   res.send("from admin controller");
};

//COMPOSE ADMIN
export const compose = async (req, res) => {
   const newAdmin = req.body;
   const userName = req.body.username;
   const designation = req.body.designation;

   try {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const admin = new LoginModel({
         name: req.body.name,
         username: req.body.username,
         password: hashPassword,
         designation: designation,
      });

      await admin.save();
      res.status(201).json({ status: "ok", admin });
   } catch (error) {
      console.log(error);
      res.status(409).json({ message: error.message });
   }
};

//CREATE NEW USER
export const newUser = async (req, res) => {
   //JWT TOKEN AUTH
   const token = req.headers["x-access-token"];
   const decode = jwt.verify(token, process.env.JWT_SECRET);
   const user_data = req.body;
   const random = Math.floor(Math.random() * 1000);
   const userName = `${req.body.first_name}Newage`;
   const Password = `${req.body.first_name.substring(0, 3)}$${random}#${new Date().getFullYear()}`;
   user_data.username = userName;

   //nodemailer
   var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.myEmail,
         pass: process.env.myPassword,
      },
   });

   var mailOptions = {
      from: process.env.myEmail,
      to: req.body.email,
      subject: "Registration Completed // sending Username and Password",
      text: `Hi, ${req.body.first_name} ${req.body.last_name}, \n
                Your Registration Completed. \n
                USERNAME: ${userName}\n
                PASSWORD: ${Password} \n\n Thank you`,
   };

   try {
      if (decode) {
         transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
               console.log(error);
            } else {
               console.log("Email sent: " + info.response);

               //bcrypt
               const hashPassword = await bcrypt.hash(Password, 10);

               const loginData = new LoginModel({
                  name: `${req.body.first_name} ${req.body.last_name}`,
                  // name: req.body.first_name + req.body.last_name,
                  username: userName,
                  password: hashPassword,
               });
               const newUser = new UserModel(user_data);
               await loginData.save();
               await newUser.save();

               res.status(201).json({ status: "ok", newUser, loginData });
            }
         });
      }
   } catch (error) {
      console.log(error.message);
      res.status(409).json({ status: "error", message: error.message });
   }
};

//GET ALL USERS
export const getAllUsers = async (req, res) => {
   try {
      //JWT TOKEN AUTH
      const token = req.headers["x-access-token"];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      if (decode) {
         const users = await UserModel.find();
         res.status(201).json({ ststus: "ok", users });
      }
   } catch (error) {
      res.status(409).json({ ststus: "error", message: error.message });
   }
};

//GET A USER
export const getAUser = async (req, res) => {
   const { id } = req.params;
   //JWT TOKEN AUTH
   const token = req.headers["x-access-token"];
   const decode = jwt.verify(token, process.env.JWT_SECRET);
   try {
      if (decode) {
         const user = await UserModel.findById(id);
         res.status(200).json({ status: "ok", user: user });
      }
   } catch (error) {
      res.ststus(409).json({ status: "ok", error: error.message });
   }
};

//UPDATE A USER
export const updateUser = async (req, res) => {
   const user_data = req.body;
   const { id } = req.params;
   console.log(id);

   //nodemailer
   var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.myEmail,
         pass: process.env.myPassword,
      },
   });
   var mailOptions = {
      from: process.env.myEmail,
      to: req.body.email,
      subject: "Registration Completed // sending Username and Password",
      text: `Hi, ${req.body.first_name} ${req.body.last_name}, \n
                Your proflie Updated . \n\n
                Thank You
                `,
   };

   try {
      const updateUser = await UserModel.findByIdAndUpdate(id, user_data);

      transporter.sendMail(mailOptions, async (error, info) => {
         if (error) {
            console.log(error);
         } else {
            console.log("Email sent: " + info.response);
         }
      });
      res.status(201).json(updateUser);
   } catch (error) {
      console.log("ERRORR::" + error.message);
      res.status(409).json({ message: error.message });
   }
};

//DELETE USER
export const deleteUser = async (req, res) => {
   const { id } = req.params;
   try {
      const deleteUserData = await UserModel.findByIdAndDelete(id);
      const deleteLoginData = await LoginModel.findOneAndDelete({
         username: deleteUserData.username,
      });
      const deleteLeaveData = await LeaveModel.findOneAndDelete(
         { username: deleteUserData.username } && { email: deleteUserData.email }
      );
      res.status(201).json({
         status: "ok",
         user: deleteUserData,
         Login: deleteLoginData,
         Leave: deleteLeaveData,
      });
   } catch (error) {
      res.status(409).json({ status: "error", error: error, message });
   }
};

//GET ALL LEAVE REQUEST
export const getAllLeaveReq = async (req, res) => {
   try {
      //JWT TOKEN AUTH
      const token = req.headers["x-access-token"];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      if (decode) {
         const leave_data = await LeaveModel.find();
         res.status(201).json(leave_data);
      }
   } catch (error) {
      console.log(error);
      res.status(409).json({ message: error.message });
   }
};

//LEAVE ACCEPTOR
export const leaveUpdate = async (req, res) => {
   const status = req.body.status;
   const { id } = req.params;

   //nodemailer
   const mailHandle = (leave, name, email) => {
      console.log(leave, name, email);
      var transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.myEmail,
            pass: process.env.myPassword,
         },
      });
      var mailOptions = {
         from: process.env.myEmail,
         to: email,
         subject: leave ? `Leave Accepted` : `Leave Rejected`,
         text: leave
            ? `Hi, ${name} \n Your Leave request accepted \n Thank You`
            : `Hi, ${name} \n Your Leave request rejected \n Thank You`,
      };

      transporter.sendMail(mailOptions, async (error, info) => {
         if (error) {
            console.log(error);
         } else {
            console.log("Email sent: " + info.response);
         }
      });
   };

   try {
      if (status) {
         const leave_data = await LeaveModel.findByIdAndUpdate(id, {
            leave_status: status,
         });
         mailHandle(status, leave_data.name, leave_data.email);
         return res.status(201).json(leave_data);
      } else {
         console.log("rejected");
         const leave_data = await LeaveModel.findByIdAndDelete(id);
         mailHandle(status, leave_data.name, leave_data.email);
         return res.status(201).json(leave_data);
      }
   } catch (error) {
      res.status(409).json();
   }
};

//BLOCK USER OR UNBLOCK USER
export const blockOrUnblock = async (req, res) => {
   const { username } = req.params;
   const { id } = req.params;
   console.log(id);
   const userBlockStatus = req.body.block;
   console.log(req.body.block);
   try {
      const blockUserLogDB = await LoginModel.findOneAndUpdate(
         { username: username },
         { block: req.body.block }
      );
      const blockUserUserDB = await UserModel.findByIdAndUpdate(id, {
         block: req.body.block,
      });
      res.json({
         data: userBlockStatus,
         status: "OOKK",
         log: blockUserLogDB,
         user: blockUserUserDB,
      });
   } catch (error) {
      res.json({ error: error.message });
   }
};
