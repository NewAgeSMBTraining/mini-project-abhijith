"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _loginController = require("../controllers/loginController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/getdata/:id", _loginController.getData);
router.post("/login", _loginController.Login);
router.put("/resetpassword", _loginController.resetPassword);
var _default = router;
exports["default"] = _default;