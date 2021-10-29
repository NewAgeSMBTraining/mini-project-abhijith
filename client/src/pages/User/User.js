import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { BaseURL, UserAxios } from "../../Axios/Axios";
import Navbar from "../../components/Navbar/Navbar";

import "./User.css";

function User() {
   const [name, setName] = useState("");
   const [userName, setUserName] = useState("");
   const [proID, setProID] = useState("");
   const [click, setClick] = useState(false);
   const [leave, SetLeave] = useState([]);
   const { parse } = useParams();
   const isTrue = parse === "true";
   const { id } = useParams();
   const history = useHistory();

   useEffect(() => {
      BaseURL.get(`getdata/${id}`).then((res) => {
         setName(res.data.user.name);
         setUserName(res.data.user.username);
         console.log(res.data.user.username);
      });
   }, [id, name, userName]);
   console.log(proID); 

   //REDIRECT TO PROFILE
   function pushToProfile() {
      const status = false;
      UserAxios.get(`profileUsername/${userName}`).then((res) => {
         setProID(res.data.user._id);
         history.push(`/profile/${status}/${res.data.user._id}/${id}`);
      });
   }

   //LEAVE STATUS
   function LeaveStatus() {
      if (!click) {
         UserAxios.get(`/getUserLeaveREQ/${userName}`).then((res) => {
            SetLeave(res.data.user);
         });
      }
      setClick(!click)
   }

   return (
      <div>
         <Navbar parse={isTrue} id={id} home={`/user/false/${id}`} />
         <div className="userRoot">
            <div className="container">
               <div className="row">
                  <div className="col-lg-9 col-sm-12 userWelcome">
                     <h2>Hi, {name}</h2>
                     <div>
                        <p>
                           Lorem Ipsum is simply dummy text of the printing and typesetting
                           industry. Lorem Ipsum has been the industry's standard dummy text ever
                           since the 1500s, when an unknown printer took a galley of type and
                           scrambled it to make a type specimen book. It has survived not only five
                           centuries, but also the leap into electronic typesetting, remaining
                           essentially unchanged. It was popularised in the 1960s with the release
                           of Letraset sheets containing Lorem Ipsum passages, and more recently
                           with desktop publishing software like Aldus PageMaker including versions
                           of Lorem Ipsum.
                           <br />
                           <br />
                           Lorem Ipsum is simply dummy text of the printing and typesetting
                           industry. Lorem Ipsum has been the industry's standard dummy text ever
                           since the 1500s, when an unknown printer took a galley of type and
                           scrambled it to make a type specimen book. It has survived not only five
                           centuries, but also the leap into electronic typesetting, remaining
                           essentially unchanged. It was popularised in the 1960s with the release
                           of Letraset sheets containing Lorem Ipsum passages, and more recently
                           with desktop publishing software like Aldus PageMaker including versions
                           of Lorem Ipsum.
                        </p>
                     </div>
                     <div>
                        <button
                           className="btn proBtn"
                           onClick={() => {
                              pushToProfile();
                           }}
                        >
                           View Profile
                        </button>
                     </div>
                  </div>
                  <div className="col-lg-3 col-sm-12 leaveRoot">
                     <h4>Leave Status</h4>
                     <hr />
                     <p
                        className="btn-show"
                        onClick={() => {
                           LeaveStatus();
                        }}
                     >
                        {click ? "Hide Status" : "Show Status"}
                     </p>
                     {click ? (
                        <div className="leave">
                           {leave.map((user) => (
                              <div>
                                 {user.leave_status ? (
                                    <div
                                       style={{ backgroundColor: "#f05454" }}
                                       className="leaveStatus"
                                    >
                                       <p>{user.name}</p>
                                       <p>Leave Accepted</p>
                                    </div>
                                 ) : (
                                    <div className="leaveStatus">
                                       <p>{user.name}</p>
                                       <p>Leave Pednding</p>
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                     ) : null}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default User;
