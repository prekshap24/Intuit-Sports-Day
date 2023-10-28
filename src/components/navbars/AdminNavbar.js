import React, {useState} from "react";
import AuthenticationService from "../authentication/AuthenticationService.js";
import {useNavigate} from "react-router-dom";
import UrlConstants from "../constants/UrlConstants";
import {MDBContainer, MDBIcon, MDBNavbar} from "mdb-react-ui-kit";
import PopupState, {bindHover, bindMenu} from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Col} from "react-bootstrap";
import MessageConstants from "../constants/MessageConstants";


function Header() {

    const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userContactNumber, setUserContactNumber] = useState('');
    const [userEmailId, setUserEmailId] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userLastLogin, setUserLastLogin] = useState('');

    const [sesMins, setSesMins] = useState('0');
    const [sesSecs, setSesSecs] = useState('0');
    const [actMins, setActMins] = useState('0');
    const [actSecs, setActSecs] = useState('0');
    let navigate = useNavigate();


    const handleLogoutRequest = (event) => {
        AuthenticationService.logout();
        navigate(UrlConstants.LOGOUT_URL);
    };

    return (
        <>

            <MDBNavbar expand="xxl" light bgColor="light">
                <MDBContainer fluid>
                    <Col md="8" style={{padding: 0}}></Col>
                    <PopupState variant="popover" popupId="user-profile-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Col md="4" style={{padding: 0, textAlign: 'right'}}>
                     <span
                         className="d-lg-block text-primary">
                         <span className=" text-secondary"
                               style={{fontWeight: "700"}} {...bindHover(popupState)}><MDBIcon fas
                                                                                               icon="user fa-lg"/>&nbsp;&nbsp;{userName}&nbsp;</span> </span>

                                    <Menu {...bindMenu(popupState)} PaperProps={{sx: {width: '250px'}}}>
                                        <MenuItem sx={{justifyContent: 'center'}}><MDBIcon
                                            icon="user-circle fa-5x"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <br/></MenuItem>
                                        <MenuItem sx={{justifyContent: 'center', whiteSpace: 'normal'}}>
                                            <p>
                                                User Id: {MessageConstants.CURRENT_USER}<br/></p>
                                        </MenuItem>
                                        <MenuItem
                                            sx={{justifyContent: 'center', whiteSpace: 'normal', fontSize: '14px'}}
                                            onClick={handleLogoutRequest}><span
                                            className="d-lg-block">Logout</span></MenuItem>
                                    </Menu>
                                </Col>
                            </React.Fragment>
                        )}
                    </PopupState>


                </MDBContainer>
            </MDBNavbar>
        </>
    );
}

export default Header;