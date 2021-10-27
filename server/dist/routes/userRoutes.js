"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/profileID/:id", _userController.getProfileID); //getprofile by id

router.get("/profileUsername/:username", _userController.getProfileUserName); //getprofile by id

router.post("/login", _userController.userLogin);
router.post("/leave", _userController.leave);
router.get("/getUserLeaveREQ/:username", _userController.getUserLeaveReq);
var _default = router;
exports["default"] = _default;