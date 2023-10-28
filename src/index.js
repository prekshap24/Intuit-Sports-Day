import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginComponent from "./components/login/LoginComponent";
import LogoutComponent from "./components/login/LogoutComponent";
import AuthenticatedRoute from "./components/authentication/AuthenticatedRoute.js";
import AuthenticateHomeRoute from "./components/authentication/AuthenticateHomeRoute.js";
import ErrorComponent from "./components/exceptions/ErrorComponent.jsx";
import ExpiryComponent from "./components/exceptions/ExpiryComponent.jsx";
import UrlConstants from "./components/constants/UrlConstants";
import HomeComponent from "./components/home/HomeComponent";
import withNavigation from "./components/navigation/WithNavigation";
import Events from "./components/events/Event";

const root = ReactDOM.createRoot(document.getElementById("root"));
const LoginComponentWithNavigation = withNavigation(LoginComponent);

root.render(
    <BrowserRouter basename={'/sd'}>
        <Routes>
            <Route path="/" element={
                <AuthenticateHomeRoute>
                    <LoginComponentWithNavigation/>
                </AuthenticateHomeRoute>
            }
            />
            <Route path="/login" element={
                <LoginComponentWithNavigation/>}
            />
            <Route
                path={UrlConstants.LOGIN_URL}
                element={<LoginComponentWithNavigation/>}
            />
            <Route
                path={UrlConstants.HOME_URL}
                element={
                    <AuthenticatedRoute>
                        <HomeComponent/>
                    </AuthenticatedRoute>
                }
            />
            <Route
                path={UrlConstants.SESSION_EXPIRY_URL}
                element={<ExpiryComponent/>}
            />
            <Route
                path={UrlConstants.LOGOUT_URL}
                element={<LogoutComponent/>}
            />
            <Route
                path={UrlConstants.EVENT_URL}
                element={<Events/>}
            />
            <Route path="*" element={<ErrorComponent/>}/>
        </Routes>
    </BrowserRouter>
);
