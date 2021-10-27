import mongoose from "mongoose";

//user
const userSchema = mongoose.Schema({
   first_name: String,
   last_name: String,
   username: String,
   email: String,
   phone_no: String,
   date_of_birth: Date,
   gender: String,
   education: [],
   experience: [],
   manager_name: String,
   leave_status: {
      type: Boolean,
      default: false,
      require: true,
   },
   block: {
      type: Boolean,
      default: false,
      require: true,
   },
});

//user login
const loginSchema = mongoose.Schema({
   name: String,
   username: String,
   password: String,
   block: {
      type: Boolean,
      default: false,
      require: true,
   },
   designation: {
      type: String,
      default: "user",
      require: true,
   },
});

//leave
const leaveSchema = mongoose.Schema({
   ID: String,
   name: String,
   email: String,
   username: String,
   Date: {
      type: Date,
      default: new Date(),
      require: true,
   },
   content: String,
   from_date: {
      type: String,
      default: null,
      require: true,
   },
   to_date: {
      type: String,
      default: null,
      require: true,
   },
   request_status: {
      type: Boolean,
      default: true,
      require: true,
   },
   leave_status: {
      type: Boolean,
      default: null,
      require: true,
   },
});

//export
export const UserModel = mongoose.model("users", userSchema);
export const LoginModel = mongoose.model("Login", loginSchema);
export const LeaveModel = mongoose.model("leave", leaveSchema);
