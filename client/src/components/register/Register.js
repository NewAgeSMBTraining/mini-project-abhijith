import React, { useState, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useParams, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import { AdminAxios } from "../../Axios/Axios";
import Navbar from "../Navbar/Navbar";

import "./Register.css";

function Register() {
   const [generalInfo, setGeneralInfo] = useState({
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      date_of_birth: null,
      gender: "",
      manager_name: "",
   });

   const [edu, setEdu] = useState("");
   const [addEdu, setAddEdu] = useState([]);
   const [exp, setExp] = useState("");
   const [addExp, setAddExp] = useState([]);
   const { id } = useParams();
   const history = useHistory();

   useEffect(() => {
      try {
         const token = localStorage.getItem("token");
         if (token) {
            const user = jwt.decode(token);
            if (!user) {
               localStorage.removeItem("token");
               history.push("/");
            } else {
               console.log("user Authenticated");
            }
         }
      } catch (error) {
         console.log(error.message);
         history.push("/");
      }
   }, [history]);

   //REGISTER
   function register(event) {
      if (generalInfo) {
         generalInfo.education = addEdu;
         generalInfo.experience = addExp;
         AdminAxios.post(`/newuser`, generalInfo, {
            headers: { "x-access-token": localStorage.getItem("token") },
         })
            .then((res) => {
               alert("User Successfully registered..👍");
               setGeneralInfo({
                  first_name: "",
                  last_name: "",
                  email: "",
                  phone_no: "",
                  date_of_birth: null,
                  gender: "",
                  manager_name: "",
               });
               setAddExp([]);
               setAddEdu([]);
            })
            .catch((error) => {
               console.log(error.message);
               alert("Registration Failed");
            });
      } else {
         alert("Click Regiser Bu");
      }
   }

   //GENERAL INFO
   function changeGeneralInfo(event) {
      setGeneralInfo((prevState) => ({
         ...prevState,
         [event.target.name]: event.target.value,
      }));
   }

   //ADD EDUCATION
   function changeEdu(event) {
      setEdu(event.target.value);
   }

   function addEducation(event) {
      event.preventDefault();
      setAddEdu((prevState) => {
         return [...prevState, edu];
      });
      setEdu("");
   }

   //DELETE EDUCATION
   function deleteEdu(id) {
      setAddEdu((prevState) => {
         return prevState.filter((data, index) => {
            return index !== id;
         });
      });
   }

   //ADD EXPERIENCE
   function changeExp(event) {
      setExp(event.target.value);
   }

   function addExperience(event) {
      event.preventDefault();
      setAddExp((prevState) => {
         return [...prevState, exp];
      });
      setExp("");
   }

   //DELETE EXPERIENCE
   function deleteExp(id) {
      setAddExp((prevState) => {
         return prevState.filter((data, index) => {
            return index !== id;
         });
      });
   }

   return (
      <div className="regiRoot">
         <div className="regiMain">
            <Navbar parse={true} id={id} home={`/admin/true/${id}`} />
            <div className="container regiForm">
               <div className="row">
                  <div className="col-md-3">
                     <div className="contact-info">
                        <h2>Become One of Us!</h2>
                        <hr />
                     </div>
                  </div>
                  <div className="col-md-9">
                     <div className="contact-form">
                        <h1>Register</h1>
                        {/* GENERAL INFO */}
                        <form className="submit-form">
                           <div className="generalInfo">
                              <h4>General Information</h4>
                              <hr />
                              <div className="form-group">
                                 <div className="form-row">
                                    <div className="col-md-6">
                                       <label className="control-label " htmlFor="first_name">
                                          First Name<span>*</span>
                                       </label>
                                       <input
                                          type="text"
                                          className="form-control"
                                          name="first_name"
                                          id="first_name"
                                          required
                                          value={generalInfo.first_name}
                                          onChange={changeGeneralInfo}
                                       />
                                    </div>
                                    <div className="col-md-6">
                                       <label className="control-label " htmlFor="date_of_birth">
                                          Last Name<span>*</span>
                                       </label>
                                       <input
                                          type="text"
                                          className="form-control"
                                          name="last_name"
                                          id="last_name"
                                          required
                                          value={generalInfo.last_name}
                                          onChange={changeGeneralInfo}
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="form-group">
                                 <div className="form-row">
                                    <div className="col-sm-12">
                                       <label className="control-label " htmlFor="email">
                                          Email ID<span>*</span>
                                       </label>

                                       <input
                                          type="email"
                                          className="form-control"
                                          name="email"
                                          id="email"
                                          required
                                          value={generalInfo.email}
                                          onChange={changeGeneralInfo}
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="form-group">
                                 <div className="form-row">
                                    <div className="col-sm-12">
                                       <label className="control-label " htmlFor="phone_no">
                                          Contact No<span>*</span>
                                       </label>

                                       <input
                                          type="text"
                                          className="form-control"
                                          name="phone_no"
                                          id="phone_no"
                                          required
                                          value={generalInfo.phone_no}
                                          onChange={changeGeneralInfo}
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="form-group">
                                 <div className="form-row">
                                    <div className="col-sm-12">
                                       <label className="control-label " htmlFor="date_of_birth">
                                          Date of Birth<span>*</span>
                                       </label>

                                       <input
                                          type="date"
                                          className="form-control"
                                          name="date_of_birth"
                                          id="date_of_birth"
                                          required
                                          value={generalInfo.date_of_birth}
                                          onChange={changeGeneralInfo}
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="form-group">
                                 <div className="form-row">
                                    <div className="col-sm-12">
                                       <label className="control-label " htmlFor="gender">
                                          Gender<span>*</span>
                                       </label>
                                       <select
                                          className="form-control"
                                          name="gender"
                                          id="gender"
                                          value={generalInfo.gender}
                                          onChange={changeGeneralInfo}
                                       >
                                          <option defaultValue="male">Male</option>
                                          <option value="female">Female</option>
                                          <option value="others">Others</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div className="official">
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
                                          <input
                                             type="text"
                                             className="form-control"
                                             name="manager_name"
                                             id="manager_name"
                                             value={generalInfo.manager_name}
                                             onChange={changeGeneralInfo}
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              {/* <button type="submit" className="btn btn-sm AddBtn">Save</button> */}
                           </div>
                        </form>
                        {/* EDUCATION */}
                        <form onSubmit={addEducation}>
                           <div className="educationInfo">
                              <h4>Education</h4>
                              <hr />
                              <div className="form-group">
                                 <div className="form-row">
                                    <div className="col-md-12">
                                       <label
                                          className="control-label col-md-6 col-sm-2 mb-3"
                                          htmlFor="date_of_birth"
                                       >
                                          Course<span>*</span>
                                       </label>
                                       <input
                                          type="text"
                                          className="form-control"
                                          name="education"
                                          id="education"
                                          value={edu}
                                          onChange={changeEdu}
                                       />
                                       <small className="text-muted">
                                          Eg: B.tech in Electrical
                                       </small>
                                    </div>
                                 </div>
                                 <div className="form-row">
                                    <div className="col-sm-12 mr-auto">
                                       <button
                                          // onClick={()=>{addEduCation()}}
                                          type="submit"
                                          className="btn btn-sm add btn-outline-dark"
                                       >
                                          Add
                                       </button>
                                    </div>
                                 </div>
                              </div>
                              <div className="form-group">
                                 <ul>
                                    {addEdu.map((data, index) => (
                                       <div class="list">
                                          <li>
                                             {data}
                                             <span>
                                                <div
                                                   onClick={() => {
                                                      deleteEdu(index);
                                                   }}
                                                   className="icon"
                                                >
                                                   <TiDeleteOutline />
                                                </div>
                                             </span>
                                          </li>
                                       </div>
                                    ))}
                                 </ul>
                              </div>
                              {/* <button className="btn btn-sm AddBtn">Save</button> */}
                           </div>
                        </form>
                        {/* EXPERIENCE */}
                        <form onSubmit={addExperience}>
                           <div className="experienceInfo">
                              <h4>Experience</h4>
                              <hr />
                              <div className="form-group">
                                 <div className="form-row">
                                    <div className="col-md-12">
                                       <label
                                          className="control-label col-md-6 col-sm-2 mb-3"
                                          htmlFor="job_title"
                                       >
                                          Designation<span>*</span>
                                       </label>
                                       <input
                                          type="text"
                                          className="form-control"
                                          name="job_title"
                                          id="job_title"
                                          value={exp}
                                          onChange={changeExp}
                                       />
                                       <small className="text-muted">
                                          Eg: Full Stack Developer, 1years
                                       </small>
                                    </div>
                                 </div>
                                 <div className="form-row">
                                    <div className="col-sm-12 mr-auto">
                                       <button
                                          type="submit"
                                          className="btn btn-sm add btn-outline-dark"
                                       >
                                          Add
                                       </button>
                                    </div>
                                 </div>
                              </div>

                              <div className="form-group">
                                 <ul>
                                    {addExp.map((data, index) => (
                                       <div class="list">
                                          <li>
                                             {data}
                                             <span>
                                                <div
                                                   onClick={() => {
                                                      deleteExp(index);
                                                   }}
                                                   className="icon"
                                                >
                                                   <TiDeleteOutline />
                                                </div>
                                             </span>{" "}
                                          </li>
                                       </div>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        </form>
                        <div className="form-group">
                           <div className="form-row">
                              <div className="col-sm-offset-2 col-sm-12">
                                 <button
                                    onClick={() => {
                                       register();
                                    }}
                                    type="submit"
                                    className="btn btn-lg regiButton"
                                 >
                                    Register
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Register;
