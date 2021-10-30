import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BaseURL } from "../../Axios/Axios";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import "./Login.css";

function Login() {
   const [loginData, setLoginData] = useState({
      username: "",
      password: "",
   });
   const history = useHistory();

   //HANDLE CHANGES
   function handleChange(event) {
      setLoginData((prevState) => ({
         ...prevState,
         [event.target.name]: event.target.value,
      }));
   }

   //HANDLE SUBMIT
   function handleSubmit(event) {
      event.preventDefault();
      BaseURL.post("login", loginData)
         .then((res) => {
            if (res.data.user.designation === "user" && res.data.token ) {
               if (res.data.user.block === false) {
                  localStorage.setItem("token", res.data.token);
                  history.push(`/user/${false}/${res.data.user._id}`);
               } else {
                  alert("Access denied \nContact your manager");
                  history.push("/");
               }
            } else if (res.data.user.designation !== "user" && res.data.token) {
               localStorage.setItem("token", res.data.token);
               history.push(`/admin/${true}/${res.data.user._id}`);
            }
         })
         .catch((err) => {
            console.log(err);
            alert("Login failed Please Check your USERNAME or PASSWORD ☹️");
         });
      setLoginData({
         username: "",
         password: "",
      });
   }

   return (
      <div className="loginRoot">
         <div className="loginMain">
            <div className="form">
               <div className="loginHeader">
                  <h2>Login</h2>
                  <p>Mini-Project</p>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="form-items">
                     <label>
                        <FaUser />
                     </label>
                     <input
                        name="username"
                        type="text"
                        placeholder="usename"
                        required
                        onChange={handleChange}
                        value={loginData.username}
                     />
                  </div>
                  <div className="form-items">
                     <label>
                        <RiLockPasswordFill />
                     </label>
                     <input
                        name="password"
                        type="password"
                        placeholder="password"
                        required
                        onChange={handleChange}
                        value={loginData.password}
                     />
                  </div>
                  <div className="form-items">
                     <a href="/resetpassword">ForgetPassword?</a>
                  </div>
                  <div className="form-items">
                     <button type="submit" className="btn btn-sm">
                        Login
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Login;
