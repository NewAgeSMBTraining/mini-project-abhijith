import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import jwt from "jsonwebtoken";
import { useHistory, useParams } from "react-router-dom";
import { AdminAxios, BaseURL } from "../../Axios/Axios";
import TableFilter from "./TableFilter";
import Navbar from "../../components/Navbar/Navbar";

import "./Admin.css";

function Admin() {
   const [name, setName] = useState("");
   const [users, setUsers] = useState([]);
   const { parse } = useParams();
   const { id } = useParams();
   const history = useHistory();
   const isTrue = parse === "true";

   useEffect(() => {
      try {
         const token = localStorage.getItem("token");
         if (token) {
            const user = jwt.decode(token);
            if (!user) {
               localStorage.removeItem("token");
               history.push("/");
            } else {
               AdminAxios.get("allusers", {
                  headers: { "x-access-token": localStorage.getItem("token") },
               }).then((res) => {
                  setUsers(res.data.users);
               });
            }
         }
         BaseURL.get(`getdata/${id}`).then((res) => {
            setName(res.data.user.name);
         });
      } catch (error) {
         console.log(error);
         history.push("/");
      }
   }, [history, id]);

   //REDIRECT TO PROFILE
   function pushToProfile(id, ID) {
      history.push(`/profile/${true}/${id}/${ID}`);
   }

   //DELETE USER
   function deleteData(id) {
      console.log(id);
      AdminAxios.delete(`delete/${id}`)
         .then((res) => {
            alert("User Deleted Successfully...👍");
            window.location.reload(false);
         })
         .catch((error) => {
            console.log(error);
            alert("failed to delete user...☹️");
         });
   }

   const data = React.useMemo(() => [...users], [users], []);

   const columns = React.useMemo(
      () => [
         {
            Header: "ID",
            accessor: "_id",
         },
         {
            Header: "First Name",
            accessor: "first_name",
         },
         {
            Header: "Last Name",
            accessor: "last_name",
         },
         {
            Header: "Email",
            accessor: "email",
         },
         {
            Header: "Contact Number",
            accessor: "phone_no",
         },
         {
            Header: "Manager Name",
            accessor: "manager_name",
         },
      ],
      []
   );
   const {
      getTableProps,
      getTableBodyProps,
      prepareRow,
      state,
      headerGroups,
      rows,
      setGlobalFilter,
   } = useTable({ columns, data }, useGlobalFilter);

   const { globalFilter } = state;

   return (
      <div>
         <Navbar parse={isTrue} id={id} home={`/admin/${isTrue}/${id}`} />
         <div className="list-root container-fluid">
            <h3>Hi, {name} </h3>
            <br />
            <div className="search ">
               <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className="list">
               <table {...getTableProps()} class="table">
                  <thead>
                     {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                           {headerGroup.headers.map((column) => (
                              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                           ))}
                           <th colspan="1" role="columnheader"></th>
                        </tr>
                     ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                     {rows.map((row) => {
                        prepareRow(row);
                        return (
                           <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                 return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                              })}

                              <button
                                 onClick={() => {
                                    pushToProfile(row.values._id, id);
                                 }}
                                 className="btn btn-sm btn-update"
                              >
                                 Profile
                              </button>
                              <button
                                 onClick={() => {
                                    deleteData(row.values._id);
                                 }}
                                 className="btn btn-sm btn-delete"
                              >
                                 Delete
                              </button>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}

export default Admin;
