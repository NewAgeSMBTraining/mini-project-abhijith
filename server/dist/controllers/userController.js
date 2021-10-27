"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLogin = exports.leave = exports.getUserLeaveReq = exports.getProfileUserName = exports.getProfileID = void 0;

var _DBmodel = require("../models/DBmodel");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//USER LOGIN
var userLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user_data, login;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user_data = req.body;
            console.log(user_data);
            login = new _DBmodel.LoginModel(user_data);
            _context.prev = 3;
            _context.next = 6;
            return login.save();

          case 6:
            res.status(201).json(login);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0.message);
            res.status(409).json({
              message: _context.t0.message
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9]]);
  }));

  return function userLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //USER LEAVE


exports.userLogin = userLogin;

var leave = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user_data, login;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user_data = req.body;
            console.log(user_data);
            login = new _DBmodel.LeaveModel(user_data);
            _context2.prev = 3;
            _context2.next = 6;
            return login.save();

          case 6:
            res.status(201).json(login);
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0.message);
            res.status(409).json({
              message: _context2.t0.message
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 9]]);
  }));

  return function leave(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //GET A USER DATA BY ID


exports.leave = leave;

var getProfileID = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, token, decode, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id; //JWT TOKEN AUTH

            token = req.headers["x-access-token"];
            decode = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
            _context3.prev = 3;

            if (!decode) {
              _context3.next = 9;
              break;
            }

            _context3.next = 7;
            return _DBmodel.UserModel.findById(id);

          case 7:
            user = _context3.sent;
            res.status(201).json({
              ststus: "ok",
              user: user
            });

          case 9:
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](3);
            res.status(409).json({
              ststus: "error",
              message: _context3.t0.message
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 11]]);
  }));

  return function getProfileID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //GET DATA BY USERNAME


exports.getProfileID = getProfileID;

var getProfileUserName = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var username, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            username = req.params.username;
            _context4.prev = 1;
            _context4.next = 4;
            return _DBmodel.UserModel.findOne({
              username: username
            });

          case 4:
            user = _context4.sent;
            res.status(201).json({
              ststus: "ok",
              user: user
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            res.status(409).json({
              ststus: "error",
              message: _context4.t0.message
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function getProfileUserName(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //GET USER LEAVE REQ


exports.getProfileUserName = getProfileUserName;

var getUserLeaveReq = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var username, LeaveData;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            username = req.params.username;
            console.log(username);
            _context5.prev = 2;
            _context5.next = 5;
            return _DBmodel.LeaveModel.find({
              username: username
            });

          case 5:
            LeaveData = _context5.sent;
            console.log(LeaveData);
            res.status(200).json({
              status: "ok",
              user: LeaveData
            });
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](2);
            res.status(409).json({
              status: "error",
              error: _context5.t0.message
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 10]]);
  }));

  return function getUserLeaveReq(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getUserLeaveReq = getUserLeaveReq;