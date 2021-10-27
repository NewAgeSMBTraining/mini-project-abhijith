import React, { useState } from "react";
import { UserAxios } from "../../Axios/Axios";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import "./Leave.css";

function Leave() {
   const { id } = useParams();
   const history = useHistory();
   const isTrue = false;
   const [leave, setLeave] = useState({
      ID: id,
      name: "",
      email: "",
      username: "",
      content: "",
      from_date: "",
      to_date: "",
   });

   //HANDLE CHANGES
   function handleChange(event) {
      console.log(event.target.value);
      setLeave((prevState) => ({
         ...prevState,
         [event.target.name]: event.target.value,
      }));
   }

   //HANDLE SUBMIT
   function handleSubmit(event) {
      UserAxios.post(`/leave`, leave)
         .then((res) => {
            console.log(res.data);
            alert("Leave Requst Submitted");
            history.push(`/user/false/${id}`);
         })
         .catch((error) => {
            alert(`Failed to submit Leave\n${error.message}`);
         });
   }

   return (
      <div className="LeaveRoot">
         <Navbar parse={isTrue} id={id} home={`/user/false/${id}`} />
         <div className="container ">
            <div className="row">
               <div className="LeaveMain ">
                  <div>
                     <h1>Leave Application</h1>
                     <hr />
                  </div>
                  <div className="LeaveForm">
                     <form onSubmit={handleSubmit}>
                        <div className="row form-group">
                           <div className="col-lg-2 ">
                              <label className="control-label" htmlFor="name">
                                 Name<span>*</span>
                              </label>
                           </div>
                           <div className="col-lg-4 ">
                              <input
                                 className="form-control"
                                 name="name"
                                 type="text"
                                 placeholder="Full Name"
                                 required
                                 onChange={handleChange}
                                 value={leave.name}
                              />
                           </div>
                        </div>
                        <div className="row form-group">
                           <div className="col-lg-2 ">
                              <label className="control-label" htmlFor="email">
                                 Email<span>*</span>
                              </label>
                           </div>
                           <div className="col-lg-4 ">
                              <input
                                 className="form-control"
                                 name="email"
                                 type="email"
                                 placeholder="Email"
                                 required
                                 onChange={handleChange}
                                 value={leave.email}
                              />
                           </div>
                        </div>
                        <div className="row form-group">
                           <div className="col-lg-2 ">
                              <label className="control-label" htmlFor="username">
                                 Username<span>*</span>
                              </label>
                           </div>
                           <div className="col-lg-4 ">
                              <input
                                 className="form-control"
                                 name="username"
                                 type="text"
                                 placeholder="Username"
                                 required
                                 onChange={handleChange}
                                 value={leave.username}
                              />
                           </div>
                        </div>
                        <div className="row form-group">
                           <div className="col-lg-2 ">
                              <label className="control-label" htmlFor="from_date">
                                 From Date<span>*</span>
                              </label>
                           </div>
                           <div className="col-lg-4 ">
                              <input
                                 className="form-control"
                                 name="from_date"
                                 type="date"
                                 required
                                 onChange={handleChange}
                                 value={leave.from_date}
                              />
                           </div>
                        </div>
                        <div className="row form-group">
                           <div className="col-lg-2 ">
                              <label className="control-label" htmlFor="to_date">
                                 To Date<span>*</span>
                              </label>
                           </div>
                           <div className="col-lg-4 ">
                              <input
                                 className="form-control"
                                 name="to_date"
                                 type="date"
                                 placeholder="Full Name"
                                 required
                                 onChange={handleChange}
                                 value={leave.to_date}
                              />
                           </div>
                        </div>
                        <div className="row form-group">
                           <div className="col-lg-2 ">
                              <label className="control-label" htmlFor="content">
                                 Content<span>*</span>
                              </label>
                           </div>
                           <div className="col-lg-4 ">
                              <textarea
                                 rows="3"
                                 className="form-control"
                                 name="content"
                                 type="text"
                                 placeholder="Content"
                                 required
                                 onChange={handleChange}
                                 value={leave.content}
                              />
                           </div>
                        </div>
                        <div className="row form-group">
                           <div className="col-lg-2">
                              <button
                                 type="submit"
                                 onClick={() => {
                                    handleSubmit();
                                 }}
                                 className="btn leaveBtn"
                              >
                                 Submit
                              </button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Leave;
