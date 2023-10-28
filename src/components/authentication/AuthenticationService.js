import React from "react";
import UrlConstants from "../constants/UrlConstants";
import ApiServices from "../constants/ApiServices";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

class AuthenticationService {


    registerSuccessfulLogin(user) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(user));
    }

    logout() {
        //console.log('Logout Called');
        if (this.getUrLList() != null) {
            let url = this.getUrLList().LOGOUT;
            let userInfo = this.getUserInfo();
            const payload = {
                username: userInfo.userId,
                transactionId: userInfo.transactionId,
            };

            ApiServices.getDetailsRequestParams(url, payload)
                .then((response) => {

                });

        }
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.clear();
        localStorage.clear();
    }

    isInvalidToken() {
        //console.log('checking token validity!');
        let parsedToken = this.getParsedJwt(this.getToken());
        if (parsedToken === null)
            return false;
        // console.log(parsedToken.exp * 1000);
        //console.log(Date.now());
        if (parsedToken.exp * 1000 < Date.now()) {
            return true;
        }

        return false;

    }

    getSessionActiveTime() {
        //console.log('checking token validity!');
        let parsedToken = this.getParsedJwt(this.getToken());
        if (parsedToken === null)
            return 0;

        return Date.now() - parsedToken.iat * 1000;

    }

    getRemaningTokenTime() {
        //console.log('checking token validity!');
        let parsedToken = this.getParsedJwt(this.getToken());
        if (parsedToken === null)
            return 0;
        if (parsedToken.exp * 1000 < Date.now()) {
            return 0;
        }

        return parsedToken.exp * 1000 - Date.now();

    }

    getUserInfo() {
        let userInfo = null;
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null)
            return null;
        else
            userInfo = JSON.parse(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).user;
        return userInfo;
    }


    getUserName() {
        let userInfo = this.getUserInfo();
        if (userInfo === null)
            return null;
        else
            return userInfo.userId;
    }


    hasRole(configId) {
        let userInfo = this.getUserInfo();
        let userRole = null
        if (userInfo == null) {
            return false;
        } else {
            userRole = userInfo.roleConfigIds;
        }
        // console.log(userRole);
        if (userRole.indexOf(configId) > -1) {
            return true;
        } else {
            return false;
        }
    }

    getToken() {
        let token = null;
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null)
            return null;
        else
            token = JSON.parse(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).accessToken;
        return token;
    }

    getParsedJwt = (token) => {
        try {
            if (token === null)
                return null;
            else
                return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    getUrLList() {
        let userList = null;
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null)
            return null;
        else
            userList = JSON.parse(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)).urlList;
        return userList;
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false;
        return true;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return "";
        return user;
    }
}

export default new AuthenticationService();
