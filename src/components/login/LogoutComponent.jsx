import React, {useEffect} from "react";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../authentication/AuthenticationService";
import logoImage from "../../icons/sportsday.jpg";
import reactlogo from "../../icons/reactlogo.png";
import {Box} from "@mui/material";
import UrlConstants from "../constants/UrlConstants";
import MessageConstants from "../constants/MessageConstants";

function LogoutComponent(props) {
    let navigate = useNavigate();

    const logout = () => {
        //console.log("logging out!");
        AuthenticationService.logout();
    }
    useEffect(() => {
        logout();
    }, []);

    const handleLoginClick = (event) => {
        navigate(UrlConstants.HOME_URL);
    };

    return (
        <div className="main_box">
            <div className="row" style={{minHeight: "100vh"}}>
                <div className="col-md-8 col-lg-8 hidden-sm hidden-xs bg-image"></div>
                <div
                    className="col-md-4 col-lg-4 col-sm-12 col-xs-12"
                    style={{backgroundColor: "white"}}
                >
                    <div className="header_box">
                        <img src={reactlogo} alt="logoairtel" className="logoImageSize"/>
                    </div>
                    <div className="logout_box">
                        <Box textAlign="center">
                            <p>{MessageConstants.LOGOUT}</p>
                            <p>{MessageConstants.THANKYOU}</p>
                            <p onClick={handleLoginClick}>{MessageConstants.LOGINAGAIN} </p>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogoutComponent;
