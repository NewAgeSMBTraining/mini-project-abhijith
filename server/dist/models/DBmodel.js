"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = exports.LoginModel = exports.LeaveModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//user
var userSchema = _mongoose["default"].Schema({
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
    "default": false,
    require: true
  },
  block: {
    type: Boolean,
    "default": false,
    require: true
  }
}); //user login


var loginSchema = _mongoose["default"].Schema({
  name: String,
  username: String,
  password: String,
  block: {
    type: Boolean,
    "default": false,
    require: true
  },
  designation: {
    type: String,
    "default": "user",
    require: true
  }
}); //leave


var leaveSchema = _mongoose["default"].Schema({
  ID: String,
  name: String,
  email: String,
  username: String,
  Date: {
    type: Date,
    "default": new Date(),
    require: true
  },
  content: String,
  from_date: {
    type: String,
    "default": null,
    require: true
  },
  to_date: {
    type: String,
    "default": null,
    require: true
  },
  request_status: {
    type: Boolean,
    "default": true,
    require: true
  },
  leave_status: {
    type: Boolean,
    "default": null,
    require: true
  }
}); //export


var UserModel = _mongoose["default"].model("users", userSchema);

exports.UserModel = UserModel;

var LoginModel = _mongoose["default"].model("Login", loginSchema);

exports.LoginModel = LoginModel;

var LeaveModel = _mongoose["default"].model("leave", leaveSchema);

exports.LeaveModel = LeaveModel;