import React, {useRef} from "react";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../authentication/AuthenticationService";
import reactlogo from "../../icons/reactlogo.png";
import {Box, Button, TextField} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import UrlConstants from "../constants/UrlConstants";
import MessageConstants from "../constants/MessageConstants";
import ApiServices from "../constants/ApiServices";

function LoginComponent(props) {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [hasLoginFailed, setHasLoginFailed] = React.useState("");
    const [showSuccessMessage, setShowSuccessMessage] = React.useState("");
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const [warningMessage, setWarningMessage] = React.useState("");

    let navigate = useNavigate();

    const removeMessage = () => {
        setShowSuccessMessage(false);
        setHasLoginFailed(false);
    }

    const handleKeyClick = (event) => {
        if (event.key === 'Enter') {
            retrieveUserDetails(event);
        }
    }

    const handleChangeU = (event) => {
        setUsername(event.target.value);
        removeMessage();
    };

    const handleChangeP = (event) => {
        setPassword(event.target.value);
        removeMessage();
    };

    //for calling API
    const retrieveUserDetails = (event) => {
        event.preventDefault();
        if (username.trim() === '') {
            userNameRef.current.childNodes[1].firstChild.focus();
            setWarningMessage('Please enter valid Username!');
            setHasLoginFailed(true);
            return;
        }

        if (password.trim() === '') {
            passwordRef.current.childNodes[1].firstChild.focus()
            setWarningMessage('Please enter valid password!');
            setHasLoginFailed(true);
            return;
        }
        loginClicked();

    };


    const loginClicked = () => {
        const payload = {
            userId: username,
            password: password,
        };

        ApiServices.getDetailsRequestParams(UrlConstants.LOGIN, payload)
            .then((response) => {
                console.log(response.data.message);
                MessageConstants.CURRENT_USER=response.data.message.user.userId;
                if (response.data.status === 'OK') {
                    AuthenticationService.registerSuccessfulLogin(response.data.message);
                    navigate(UrlConstants.HOME_URL);
                } else {
                    loginClickedFail();
                }
            })
            .catch((error) => loginClickedFail(error));
        console.log(MessageConstants.CURRENT_USER)
    };

    const loginClickedFail = () => {
        setWarningMessage(MessageConstants.INVALID_CRED);
        setShowSuccessMessage(false);
        setHasLoginFailed(true);
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
                        <img src={reactlogo} alt="logoairtel"
                             className="logoImageSize"/>
                    </div>


                    <div className="login_box">
                        <Box textAlign="center">
                            <p>{MessageConstants.LOGIN_CRED}</p>
                            {hasLoginFailed && (
                                <div className="alert alert-warning">
                                    {warningMessage}
                                </div>
                            )}
                            {showSuccessMessage && (
                                <div>{MessageConstants.LOGIN_SUCCESS}</div>
                            )}
                        </Box>
                        <Box sx={{display: "flex", alignItems: "flex-end", justifyContent: 'center'}}>
                            <AccountCircle sx={{color: "action.active", mr: 1, my: 0.5}}/>
                            <TextField
                                className="textField"
                                id="username"
                                autoFocus
                                label="Username"
                                variant="outlined"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={username}
                                ref={userNameRef}
                                onChange={handleChangeU}
                                onKeyUp={handleKeyClick}
                            />
                        </Box>

                        <Box>
                            <p></p>
                            <p></p>
                        </Box>

                        <Box sx={{display: "flex", alignItems: "flex-end", justifyContent: 'center'}}>
                            <LockIcon sx={{color: "action.active", mr: 1, my: 0.5}}/>
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                className="textField"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChangeP}
                                onKeyUp={handleKeyClick}
                                ref={passwordRef}
                            />
                        </Box>
                        <Box>
                            <p></p>
                            <p></p>
                        </Box>
                        <Box textAlign="center">
                            <Button size="large" onClick={retrieveUserDetails}>
                                {MessageConstants.LOGIN}
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
