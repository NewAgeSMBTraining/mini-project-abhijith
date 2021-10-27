import React, { useState, useEffect } from 'react'
import { useTable} from "react-table";
import {useParams, useHistory} from "react-router-dom"
import jwt from "jsonwebtoken";
import {AdminAxios} from "../../../Axios/Axios"
import Navbar from '../../../components/Navbar/Navbar';
import "./LeaveReq.css";


function LeaveReq() {
    const [users, setUsers] = useState([]);
    const isTrue = true;
    const {id} = useParams();
    const history = useHistory();

    useEffect(() =>{
        try {
            const token = localStorage.getItem("token");
            if (token) {
              const user = jwt.decode(token);
              if (!user) {
                localStorage.removeItem("token");
                history.push("/");
              } else {
                AdminAxios.get(`allleaveREQ`,{
                    headers: { "x-access-token": localStorage.getItem("token") },
                  }).then((res)=>{
                    console.log(res.data);
                    setUsers(res.data);
                  })
              }
            }
        } catch (error) {
            console.log(error.message);
        }
    },[history]);

    //ACCEPT LEAVE 
    function accept(id){
        AdminAxios.put(`/leaveUpdate/${id}`, {status: true}).then((res)=>{
            console.log(res.data);
            alert("Leave Accepted")
        })
    }

    //REJECT LEAVE
    function reject(id){
        AdminAxios.put(`/leaveUpdate/${id}`, {status: false}).then((res)=>{
            console.log(res.data);
            alert("leave rejected");
            window.location.reload(false);
        })
    }


    const data = React.useMemo(() => [...users], [users], []);

    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "_id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Username",
                accessor: "username",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Date From",
                accessor: "from_date",
            },
            {
                Header: "Date To",
                accessor: "to_date",
            },
            {
                Header: "Content",
                accessor: "content",
            },
            {
                Header: "Leave Status",
                accessor: "leave_status",
            },

        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        headerGroups,
        rows,
    } = useTable({ columns, data });
    return (
        <div>
            <Navbar parse={isTrue} id={id} home={`/admin/true/${id}`} />
            <div className="list-root container-fluid">
           <h3>Leave Requests</h3>
           <br />

                <div className="list">
                    <table {...getTableProps()} class="table">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render("Header")}
                                        </th>
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
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                            );
                                        })}

                                        <button onClick={()=>{accept(row.values._id)}} className="btn btn-le btn-sm btn-update">Accept</button>
                                        <button onClick={()=>{reject(row.values._id)}} className="btn btn-le btn-sm btn-delete">Reject</button>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default LeaveReq
