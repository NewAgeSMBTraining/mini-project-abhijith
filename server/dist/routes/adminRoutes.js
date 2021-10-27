"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _adminContoller = require("../controllers/adminContoller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/", _adminContoller.getAdmin);
router.get("/allusers", _adminContoller.getAllUsers);
router.get("/getUser/:id", _adminContoller.getAUser);
router.post("/compose", _adminContoller.compose);
router.get("/allleaveREQ", _adminContoller.getAllLeaveReq);
router.post("/newuser", _adminContoller.newUser);
router.put("/updateuser/:id", _adminContoller.updateUser);
router["delete"]("/delete/:id", _adminContoller.deleteUser);
router.put("/leaveUpdate/:id", _adminContoller.leaveUpdate);
router.put("/blockOrUnblock/:username/:id", _adminContoller.blockOrUnblock);
var _default = router;
exports["default"] = _default;