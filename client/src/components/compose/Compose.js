import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill, RiAdminFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

import { AdminAxios } from "../../Axios/Axios";
//STYLE
import "./Compose.css";

function Compose() {
   const [admin, setAdmin] = useState({
      name: "",
      username: "",
      password: "",
      designation: "Admin",
   });
   const history = useHistory();

   //HANDLE CHANGES
   function handleChange(event) {
      setAdmin((prevState) => ({
         ...prevState,
         [event.target.name]: event.target.value,
      }));
   }

   //HANDLE SUBMIT
   function handleSubmit(event) {
      event.preventDefault();
      AdminAxios.post(`compose/`, admin)
         .then((res) => {
            alert("Rgistration succesful...😁");
            if (res) {
               history.push("/");
            }
         })
         .catch((err) => {
            console.log(err.message);
            alert("Failed to register, try again");
         });
      setAdmin({
         name: "",
         username: "",
         password: "",
         designation: "Admin",
      });
   }

   return (
      <div className="composeRoot">
         <div className="composeMain">
            <div className="form">
               <div className="composeHeader">
                  <h2>Register</h2>
                  <p>Mini-Project-Admin</p>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="form-items">
                     <label>
                        <FaUser />
                     </label>
                     <input
                        name="name"
                        type="text"
                        placeholder="name"
                        required
                        onChange={handleChange}
                        value={admin.name}
                     />
                  </div>
                  <div className="form-items">
                     <label>
                        <RiAdminFill />
                     </label>
                     <input
                        name="designation"
                        type="text"
                        placeholder="Admin"
                        disabled
                        required
                        onChange={handleChange}
                        value={admin.designation}
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
                        value={admin.username}
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
                        value={admin.password}
                     />
                  </div>
                  <div className="form-items">
                     <button className="btn btn-sm">Register</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Compose;
