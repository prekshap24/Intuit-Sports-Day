import React from "react";
import {Navigate} from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";
import UrlConstants from "../constants/UrlConstants";

function AuthenticatedRoute(props) {

    //console.log('Logged in : '+AuthenticationService.isUserLoggedIn());

    if (AuthenticationService.isInvalidToken()) {
        return <Navigate to={UrlConstants.SESSION_EXPIRY_URL}/>;
    } else if (AuthenticationService.isUserLoggedIn()) {
        return {...props.children};
    } else {
        AuthenticationService.logout();
        return <Navigate to="/login"/>;
    }
}

export default AuthenticatedRoute;
