"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _adminRoutes = _interopRequireDefault(require("./routes/adminRoutes"));

var _loginRoutes = _interopRequireDefault(require("./routes/loginRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use("/api", _loginRoutes["default"]);
app.use("/api/user", _userRoutes["default"]);
app.use("/api/admin", _adminRoutes["default"]);

_mongoose["default"].connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (res) {
  console.log("Connected to the Data-Base ");
  app.listen(process.env.PORT, function () {
    console.log("Server Running on Port ".concat(process.env.PORT));
  });
})["catch"](function (err) {
  console.log("ERROR::: ".concat(err));
});

app.get("/", function (req, res) {
  res.send("Tested ok server..!");
});