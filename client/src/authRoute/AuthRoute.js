import React from 'react';
import {Route,Redirect} from "react-router-dom"

function AuthRoute(props) {
    const isAuthenticated = localStorage.getItem("token")

    return (
        isAuthenticated ? <Route {...props}/> : <Redirect to="/"/>
    )
}

export default AuthRoute
