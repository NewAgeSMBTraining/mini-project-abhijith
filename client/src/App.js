import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/register/Register";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
import User from "./pages/User/User";
import Compose from "./components/compose/Compose";
import Reset from "./pages/Reset/Reset";
import Leave from "./pages/Leave/Leave";
import LeaveReq from "./pages/Admin/LeaveReq/LeaveReq";
import Update from "./pages/Update/Update";
import AuthRoute from "./authRoute/AuthRoute";
import "./index.css";

function App() {
   return (
      <div className="App">
         <Router>
            <Switch>
               <AuthRoute exact path="/admin/:parse/:id" >
                  <Admin />
               </AuthRoute>
               <AuthRoute exact path="/user/:parse/:id">
                  <User />
               </AuthRoute>
               <Route exact path="/">
                  <Login />
               </Route>
               <AuthRoute exact path="/register/:id">
                  <Register />
               </AuthRoute>
               <Route exact path="/compose">
                  <Compose />
               </Route>
               <AuthRoute exact path="/profile/:status/:id/:ID">
                  <Profile />
               </AuthRoute>
               <Route exact path="/resetpassword">
                  <Reset />
               </Route>
               <AuthRoute exact path="/leaveRequest/:id">
                  <Leave />
               </AuthRoute>
               <AuthRoute exact path="/allLeaveRequests/:id">
                  <LeaveReq />
               </AuthRoute>
               <AuthRoute exact path="/update/:id/:ID">
                  <Update />
               </AuthRoute>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
