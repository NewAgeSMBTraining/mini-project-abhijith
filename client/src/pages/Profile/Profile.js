import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import { UserAxios, AdminAxios } from "../../Axios/Axios";
import Navbar from "../../components/Navbar/Navbar";

import "./Profile.css";

function Register() {
   const [userInfo, setUserInfo] = useState({});
   const [userEdu, setUserEdu] = useState([]);
   const [userExp, setUserExp] = useState([]);
   const [userName, setUserName] = useState("");
   const [block, setBlock] = useState(true);
   const { id } = useParams();
   const { ID } = useParams();
   const { status } = useParams();
   const isTrue = status === "true";
   const history = useHistory();

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
         const user = jwt.decode(token);
         if (!user) {
            localStorage.removeItem("token");
            history.push("/");
         } else {
            UserAxios.get(`profileID/${id}`, {
               headers: { "x-access-token": localStorage.getItem("token") },
            })
               .then((res) => {
                  console.log(res.data.user);
                  setUserInfo(res.data.user);
                  setUserName(res.data.user.username);
                  setUserEdu(res.data.user.education);
                  setUserExp(res.data.user.experience);
                  setBlock(res.data.user.block);
               })
               .catch((err) => {
                  console.log(err.message);
                  alert(err.message);
               });
         }
      }
   }, [history, id]);

   //BLOCK USER UNBLOCK USER
   function blockOrUnblock(event) {
      event.preventDefault();
      AdminAxios.put(`blockOrUnblock/${userName}/${id}`, { block: !block }).then((res) => {
         setBlock(!block);
         if (res.data.log.block || block) {
            setBlock(false);
            alert("User Blocked");
         } else {
            setBlock(true);
            alert("User Unblocked");
         }
      });
   }

   return (
      <div>
         <Navbar
            parse={isTrue ? true : false}
            id={id}
            home={isTrue ? `/admin/true/${ID}` : `/user/false/${ID}`}
         />
         <div className="regiRoot">
            <div className="regiMain">
               <div className="container regiForm Profile">
                  <div className="row">
                     <div className="col-md-3">
                        <div className="contact-info">
                           <h2>Become One of Us!</h2>
                           <hr />
                        </div>
                     </div>
                     <div className="col-md-9">
                        <form className="submit-form">
                           <div className="contact-form">
                              <h1>Profile</h1>
                              {/* GENERAL INFO */}
                              <div className="generalInfo">
                                 <h4>General Information</h4>
                                 <hr />
                                 <div className="form-group">
                                    <div className="form-row">
                                       <div className="col-md-6">
                                          <label className="control-label ">
                                             First Name<span>*</span>
                                          </label>
                                          <h6>{userInfo.first_name}</h6>
                                       </div>
                                       <div className="col-md-6">
                                          <label className="control-label ">
                                             Last Name<span>*</span>
                                          </label>
                                          <h6>{userInfo.last_name}</h6>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="form-row">
                                       <div className="col-sm-12">
                                          <label className="control-label ">
                                             Email ID<span>*</span>
                                          </label>
                                          <h6>{userInfo.email}</h6>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="form-row">
                                       <div className="col-sm-12">
                                          <label className="control-label ">
                                             Contact No<span>*</span>
                                          </label>
                                          <h6>{userInfo.phone_no}</h6>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="form-row">
                                       <div className="col-sm-12">
                                          <label className="control-label ">
                                             Date of Birth<span>*</span>
                                          </label>
                                          <h6>{userInfo.date_of_birth}</h6>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="form-group">
                                    <div className="form-row">
                                       <div className="col-sm-12">
                                          <label className="control-label ">
                                             Gender<span>*</span>
                                          </label>
                                          <h6>{userInfo.gender}</h6>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              {/* EDUCATION */}
                              <div className="educationInfo">
                                 <h4>Education</h4>
                                 <hr />
                                 <div className="form-group">
                                    <ul>
                                       {userEdu.map((edu, index) => (
                                          <div class="list">
                                             <li>{edu}</li>
                                          </div>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                              {/* EXPERIENCE */}
                              <div className="experience">
                                 <h4>Experience</h4>
                                 <hr />
                                 <div className="form-group">
                                    <ul>
                                       {userExp.map((exp, idex) => (
                                          <div class="list">
                                             <li>{exp}</li>
                                          </div>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                              <div className="experience">
                                 <h4>Official</h4>
                                 <hr />
                                 <div className="form-group">
                                    <div className="form-row">
                                       <div className="col-md-12">
                                          <label
                                             className="control-label col-md-6 col-sm-2 mb-3"
                                             htmlFor="manager_name"
                                          >
                                             Manager Name<span>*</span>
                                          </label>
                                          <h6>{userInfo.manager_name}</h6>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="form-group">
                                 <div className="form-row">
                                    {isTrue ? (
                                       <div className="col-sm-offset-2 col-sm-12">
                                          <button
                                             onClick={() => {
                                                history.push(`/update/${id}`);
                                             }}
                                             className="btn  updateBtn"
                                          >
                                             update
                                          </button>
                                          <button
                                             onClick={() => {
                                                blockOrUnblock();
                                             }}
                                             className="btn  blockBtn"
                                          >
                                             {block ? "Unblock" : "Block"}
                                          </button>
                                       </div>
                                    ) : null}
                                 </div>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Register;
