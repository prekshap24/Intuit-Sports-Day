import React from "react";
import AuthenticationService from "./AuthenticationService.js";

function AuthenticateHomeRoute(props) {
    if (AuthenticationService.isUserLoggedIn()) {
        AuthenticationService.logout();
    }
    return {...props.children}
}

export default AuthenticateHomeRoute;
