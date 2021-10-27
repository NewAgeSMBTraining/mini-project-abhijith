import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BaseURL } from "../../Axios/Axios";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill, RiAdminFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

import "./Reset.css";

function Reset() {
   const [resetData, setResetData] = useState({
      first_name: "",
      last_name: "",
      username: "",
      new_password: "",
   });

   const history = useHistory();
   // HANDEL CHANGE
   function handleChange(event) {
      setResetData((prevState) => ({
         ...prevState,
         [event.target.name]: event.target.value,
      }));
   }
   //HANDEL SUBMIT
   function handleSubmit(event) {
      event.preventDefault();
      console.log(resetData);
      BaseURL.put("resetpassword", resetData)
         .then((res) => {
            alert("Password Reset successfully....👍");
            history.push("/");
         })
         .catch((err) => {
            console.log(err.message);
            alert("Failed to Reset Password...🤐\n check your details...!");
         });
   }

   return (
      <div className="composeRoot">
         <div className="composeMain">
            <div className="form">
               <div className="composeHeader">
                  <h2>Reset Password</h2>
                  <p>Mini-Project</p>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="form-items">
                     <label>
                        <FaUser />
                     </label>
                     <input
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        required
                        onChange={handleChange}
                        value={resetData.first_name}
                     />
                  </div>
                  <div className="form-items">
                     <label>
                        <RiAdminFill />
                     </label>
                     <input
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        required
                        onChange={handleChange}
                        value={resetData.last_name}
                     />
                  </div>
                  <div className="form-items">
                     <label>
                        <MdEmail />
                     </label>
                     <input
                        name="username"
                        type="text"
                        placeholder="username"
                        required
                        onChange={handleChange}
                        value={resetData.username}
                     />
                  </div>
                  <div className="form-items">
                     <label>
                        <RiLockPasswordFill />
                     </label>
                     <input
                        name="new_password"
                        type="password"
                        placeholder="New Password"
                        required
                        onChange={handleChange}
                        value={resetData.password}
                     />
                  </div>
                  <div className="form-items">
                     <a href="/">Login</a>
                  </div>
                  <div className="form-items">
                     <button className="btn btn-sm">Confirm</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Reset;
