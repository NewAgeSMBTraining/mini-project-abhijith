"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.getData = exports.Login = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _DBmodel = require("../models/DBmodel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//GET A DATA
var getData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.prev = 1;
            _context.next = 4;
            return _DBmodel.LoginModel.findById(id);

          case 4:
            data = _context.sent;
            res.status(201).json({
              status: "ok",
              user: data
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            res.status(409).json({
              status: "error",
              error: _context.t0
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function getData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //LOGIN


exports.getData = getData;

var Login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var loginData, user, isPasswordValid, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            loginData = req.body;
            console.log(loginData.username);
            console.log(loginData.password);
            console.log(process.env.JWT_SECRET);
            console.log(_typeof(process.env.JWT_SECRET));
            _context2.prev = 5;
            _context2.next = 8;
            return _DBmodel.LoginModel.findOne({
              username: loginData.username
            });

          case 8:
            user = _context2.sent;

            if (user) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(409).json({
              status: "error",
              error: "Invalid username"
            }));

          case 11:
            _context2.next = 13;
            return _bcrypt["default"].compare(loginData.password, user.password);

          case 13:
            isPasswordValid = _context2.sent;

            if (!isPasswordValid) {
              _context2.next = 19;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              name: user.name,
              email: user.username
            }, process.env.JWT_SECRET);
            return _context2.abrupt("return", res.status(201).json({
              status: "ok",
              token: token,
              user: user
            }));

          case 19:
            res.status(409).json({
              status: "error",
              error: "Invalid Password"
            });

          case 20:
            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](5);
            res.status(409).json({
              status: "error",
              message: "password....wrong"
            });

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 22]]);
  }));

  return function Login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //RESET PASSWORD


exports.Login = Login;

var resetPassword = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user_data, newPassword, hashPassword, loginData;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user_data = req.body;
            newPassword = req.body.new_password;
            console.log(newPassword);
            console.log(user_data);
            _context3.prev = 4;
            _context3.next = 7;
            return _bcrypt["default"].hash(req.body.new_password, 10);

          case 7:
            hashPassword = _context3.sent;
            console.log(hashPassword);
            _context3.next = 11;
            return _DBmodel.LoginModel.findOneAndUpdate({
              username: req.body.username
            } && {
              name: "".concat(req.body.first_name, " ").concat(req.body.last_name)
            }, {
              password: hashPassword
            });

          case 11:
            loginData = _context3.sent;
            console.log(loginData);

            if (loginData) {
              res.status(201).json({
                status: "ok"
              });
            } else {
              res.status(409).json({
                status: "error",
                message: error.message
              });
            }

            _context3.next = 19;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](4);
            res.status(409).json({
              status: "error",
              message: _context3.t0.message
            });

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 16]]);
  }));

  return function resetPassword(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;