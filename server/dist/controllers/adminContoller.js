"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.newUser = exports.leaveUpdate = exports.getAllUsers = exports.getAllLeaveReq = exports.getAdmin = exports.getAUser = exports.deleteUser = exports.compose = exports.blockOrUnblock = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _DBmodel = require("../models/DBmodel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAdmin = function getAdmin(req, res) {
  res.send("from admin controller");
}; //COMPOSE ADMIN


exports.getAdmin = getAdmin;

var compose = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var newAdmin, userName, designation, hashPassword, admin;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newAdmin = req.body;
            userName = req.body.username;
            designation = req.body.designation;
            _context.prev = 3;
            _context.next = 6;
            return _bcrypt["default"].hash(req.body.password, 10);

          case 6:
            hashPassword = _context.sent;
            admin = new _DBmodel.LoginModel({
              name: req.body.name,
              username: req.body.username,
              password: hashPassword,
              designation: designation
            });
            _context.next = 10;
            return admin.save();

          case 10:
            res.status(201).json({
              status: "ok",
              admin: admin
            });
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            res.status(409).json({
              message: _context.t0.message
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 13]]);
  }));

  return function compose(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //CREATE NEW USER


exports.compose = compose;

var newUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var token, decode, user_data, random, userName, Password, transporter, mailOptions;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //JWT TOKEN AUTH
            token = req.headers["x-access-token"];
            decode = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
            user_data = req.body;
            random = Math.floor(Math.random() * 1000);
            userName = "".concat(req.body.first_name, "Newage");
            Password = "".concat(req.body.first_name.substring(0, 3), "$").concat(random, "#").concat(new Date().getFullYear());
            user_data.username = userName; //nodemailer

            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
              auth: {
                user: process.env.myEmail,
                pass: process.env.myPassword
              }
            });
            mailOptions = {
              from: process.env.myEmail,
              to: req.body.email,
              subject: "Registration Completed // sending Username and Password",
              text: "Hi, ".concat(req.body.first_name, " ").concat(req.body.last_name, ", \n\n                Your Registration Completed. \n\n                USERNAME: ").concat(userName, "\n\n                PASSWORD: ").concat(Password, " \n\n Thank you")
            };

            try {
              if (decode) {
                transporter.sendMail(mailOptions, /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(error, info) {
                    var hashPassword, loginData, _newUser;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!error) {
                              _context2.next = 4;
                              break;
                            }

                            console.log(error);
                            _context2.next = 15;
                            break;

                          case 4:
                            console.log("Email sent: " + info.response); //bcrypt

                            _context2.next = 7;
                            return _bcrypt["default"].hash(Password, 10);

                          case 7:
                            hashPassword = _context2.sent;
                            loginData = new _DBmodel.LoginModel({
                              name: "".concat(req.body.first_name, " ").concat(req.body.last_name),
                              // name: req.body.first_name + req.body.last_name,
                              username: userName,
                              password: hashPassword
                            });
                            _newUser = new _DBmodel.UserModel(user_data);
                            _context2.next = 12;
                            return loginData.save();

                          case 12:
                            _context2.next = 14;
                            return _newUser.save();

                          case 14:
                            res.status(201).json({
                              status: "ok",
                              newUser: _newUser,
                              loginData: loginData
                            });

                          case 15:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x5, _x6) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              }
            } catch (error) {
              console.log(error.message);
              res.status(409).json({
                status: "error",
                message: error.message
              });
            }

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function newUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //GET ALL USERS


exports.newUser = newUser;

var getAllUsers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var token, decode, users;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            //JWT TOKEN AUTH
            token = req.headers["x-access-token"];
            decode = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

            if (!decode) {
              _context4.next = 8;
              break;
            }

            _context4.next = 6;
            return _DBmodel.UserModel.find();

          case 6:
            users = _context4.sent;
            res.status(201).json({
              ststus: "ok",
              users: users
            });

          case 8:
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            res.status(409).json({
              ststus: "error",
              message: _context4.t0.message
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function getAllUsers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //GET A USER


exports.getAllUsers = getAllUsers;

var getAUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, token, decode, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id; //JWT TOKEN AUTH

            token = req.headers["x-access-token"];
            decode = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
            _context5.prev = 3;

            if (!decode) {
              _context5.next = 9;
              break;
            }

            _context5.next = 7;
            return _DBmodel.UserModel.findById(id);

          case 7:
            user = _context5.sent;
            res.status(200).json({
              status: "ok",
              user: user
            });

          case 9:
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](3);
            res.ststus(409).json({
              status: "ok",
              error: _context5.t0.message
            });

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 11]]);
  }));

  return function getAUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //UPDATE A USER


exports.getAUser = getAUser;

var updateUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var user_data, id, transporter, mailOptions, _updateUser;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            user_data = req.body;
            id = req.params.id;
            console.log(id); //nodemailer

            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
              auth: {
                user: process.env.myEmail,
                pass: process.env.myPassword
              }
            });
            mailOptions = {
              from: process.env.myEmail,
              to: req.body.email,
              subject: "Registration Completed // sending Username and Password",
              text: "Hi, ".concat(req.body.first_name, " ").concat(req.body.last_name, ", \n\n                Your proflie Updated . \n\n\n                Thank You\n                ")
            };
            _context7.prev = 5;
            _context7.next = 8;
            return _DBmodel.UserModel.findByIdAndUpdate(id, user_data);

          case 8:
            _updateUser = _context7.sent;
            transporter.sendMail(mailOptions, /*#__PURE__*/function () {
              var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(error, info) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("Email sent: " + info.response);
                        }

                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x13, _x14) {
                return _ref7.apply(this, arguments);
              };
            }());
            res.status(201).json(_updateUser);
            _context7.next = 17;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](5);
            console.log("ERRORR::" + _context7.t0.message);
            res.status(409).json({
              message: _context7.t0.message
            });

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[5, 13]]);
  }));

  return function updateUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //DELETE USER


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, deleteUserData, deleteLoginData, deleteLeaveData;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return _DBmodel.UserModel.findByIdAndDelete(id);

          case 4:
            deleteUserData = _context8.sent;
            _context8.next = 7;
            return _DBmodel.LoginModel.findOneAndDelete({
              username: deleteUserData.username
            });

          case 7:
            deleteLoginData = _context8.sent;
            _context8.next = 10;
            return _DBmodel.LeaveModel.findOneAndDelete({
              username: deleteUserData.username
            } && {
              email: deleteUserData.email
            });

          case 10:
            deleteLeaveData = _context8.sent;
            res.status(201).json({
              status: "ok",
              user: deleteUserData,
              Login: deleteLoginData,
              Leave: deleteLeaveData
            });
            _context8.next = 17;
            break;

          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8["catch"](1);
            res.status(409).json({
              status: "error",
              error: _context8.t0,
              message: message
            });

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 14]]);
  }));

  return function deleteUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //GET ALL LEAVE REQUEST


exports.deleteUser = deleteUser;

var getAllLeaveReq = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var token, decode, leave_data;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            //JWT TOKEN AUTH
            token = req.headers["x-access-token"];
            decode = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

            if (!decode) {
              _context9.next = 8;
              break;
            }

            _context9.next = 6;
            return _DBmodel.LeaveModel.find();

          case 6:
            leave_data = _context9.sent;
            res.status(201).json(leave_data);

          case 8:
            _context9.next = 14;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            res.status(409).json({
              message: _context9.t0.message
            });

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 10]]);
  }));

  return function getAllLeaveReq(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}(); //LEAVE ACCEPTOR


exports.getAllLeaveReq = getAllLeaveReq;

var leaveUpdate = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var status, id, mailHandle, leave_data, _leave_data;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            status = req.body.status;
            id = req.params.id; //nodemailer

            mailHandle = function mailHandle(leave, name, email) {
              console.log(leave, name, email);

              var transporter = _nodemailer["default"].createTransport({
                service: "gmail",
                auth: {
                  user: process.env.myEmail,
                  pass: process.env.myPassword
                }
              });

              var mailOptions = {
                from: process.env.myEmail,
                to: email,
                subject: leave ? "Leave Accepted" : "Leave Rejected",
                text: leave ? "Hi, ".concat(name, " \n Your Leave request accepted \n Thank You") : "Hi, ".concat(name, " \n Your Leave request rejected \n Thank You")
              };
              transporter.sendMail(mailOptions, /*#__PURE__*/function () {
                var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(error, info) {
                  return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          if (error) {
                            console.log(error);
                          } else {
                            console.log("Email sent: " + info.response);
                          }

                        case 1:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }));

                return function (_x21, _x22) {
                  return _ref11.apply(this, arguments);
                };
              }());
            };

            _context11.prev = 3;

            if (!status) {
              _context11.next = 12;
              break;
            }

            _context11.next = 7;
            return _DBmodel.LeaveModel.findByIdAndUpdate(id, {
              leave_status: status
            });

          case 7:
            leave_data = _context11.sent;
            mailHandle(status, leave_data.name, leave_data.email);
            return _context11.abrupt("return", res.status(201).json(leave_data));

          case 12:
            console.log("rejected");
            _context11.next = 15;
            return _DBmodel.LeaveModel.findByIdAndDelete(id);

          case 15:
            _leave_data = _context11.sent;
            mailHandle(status, _leave_data.name, _leave_data.email);
            return _context11.abrupt("return", res.status(201).json(_leave_data));

          case 18:
            _context11.next = 23;
            break;

          case 20:
            _context11.prev = 20;
            _context11.t0 = _context11["catch"](3);
            res.status(409).json();

          case 23:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[3, 20]]);
  }));

  return function leaveUpdate(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}(); //BLOCK USER OR UNBLOCK USER


exports.leaveUpdate = leaveUpdate;

var blockOrUnblock = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var username, id, userBlockStatus, blockUserLogDB, blockUserUserDB;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            username = req.params.username;
            id = req.params.id;
            console.log(id);
            userBlockStatus = req.body.block;
            console.log(req.body.block);
            _context12.prev = 5;
            _context12.next = 8;
            return _DBmodel.LoginModel.findOneAndUpdate({
              username: username
            }, {
              block: req.body.block
            });

          case 8:
            blockUserLogDB = _context12.sent;
            _context12.next = 11;
            return _DBmodel.UserModel.findByIdAndUpdate(id, {
              block: req.body.block
            });

          case 11:
            blockUserUserDB = _context12.sent;
            res.json({
              data: userBlockStatus,
              status: "OOKK",
              log: blockUserLogDB,
              user: blockUserUserDB
            });
            _context12.next = 18;
            break;

          case 15:
            _context12.prev = 15;
            _context12.t0 = _context12["catch"](5);
            res.json({
              error: _context12.t0.message
            });

          case 18:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[5, 15]]);
  }));

  return function blockOrUnblock(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.blockOrUnblock = blockOrUnblock;