import React from "react";
import { useHistory } from "react-router-dom";

import "./Navbar.css";

function Navbar(props) {
   const history = useHistory();

   return (
      <div>
         <nav className="navbar navbar-expand-lg ">
            <a className="navbar-brand" href={props.home}>
               Mini-Project
            </a>
            <button
               className="navbar-toggler"
               type="button"
               data-toggle="collapse"
               data-target="#navbarNavAltMarkup"
               aria-controls="navbarNavAltMarkup"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
               <div className="navbar-nav ml-auto">
                  <a className="nav-item nav-link " href={props.home}>
                     Home{" "}
                  </a>
                  {props.parse ? (
                     <>
                        <a className="nav-item nav-link " href={`/register/${props.id}`}>
                           New Employee{" "}
                        </a>
                        <a className="nav-item nav-link" href={`/allLeaveRequests/${props.id}`}>
                           Leave Requests
                        </a>
                     </>
                  ) : (
                     <a className="nav-item nav-link" href={`/leaveRequest/${props.id}`}>
                        Apply Leave{" "}
                     </a>
                  )}

                  <a
                     className="nav-item nav-link"
                     href=""
                     onClick={() => {
                        localStorage.removeItem("token");
                        history.push("/");
                     }}
                  >
                     Log Out
                  </a>
               </div>
            </div>
         </nav>
      </div>
   );
}

export default Navbar;
