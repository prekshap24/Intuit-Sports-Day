import React from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import sidebarImage from "../../assets/img/blue-solid.png";
import routes from "./leftMenuRoutes";
import PopupState, {bindHover, bindMenu} from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UrlConstants from "../constants/UrlConstants";
import AuthenticationService from "../authentication/AuthenticationService.js";

function LeftMenu() {
    const location = useLocation();
    const [date, setDate] = React.useState(new Date());
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };

    // const handlePopupState = (event, popupState) => {
    //   // console.log('click');
    //   popupState.close();
    // };
    return (
        <div className="sidebar" data-image={sidebarImage} data-color={"black"}>
            <div
                className="sidebar-background"
                style={{
                    backgroundImage: "url(" + sidebarImage + ")",
                }}
            />
            <div className="sidebar-wrapper">
                <div className="logo  align-items-center justify-content-center">
                    <div className="logo-img"/>
                    <NavLink
                        to={UrlConstants.HOME_URL}
                        className="nav-link"
                        activeclassname="active"
                    >
                        <img src={require("../../assets/img/reactlogo.png")} height='30px' width='40px'/>
                    </NavLink>
                </div>
                <Nav>
                    {routes.map((prop, key) => {
                        if (!prop.redirect)
                            return (

                                <li
                                    className={
                                        prop.upgrade
                                            ? "active active-pro"
                                            : activeRoute(prop.layout + prop.path)
                                    }
                                    key={key}
                                >

                                    <PopupState variant="popover" popupId={prop.popupId}>
                                        {(popupState) => (
                                            <React.Fragment>
                                                <NavLink
                                                    // to={prop.layout + prop.path}
                                                    className="nav-link "
                                                    activeclassname="active"
                                                    {...bindHover(popupState)}
                                                >
                                                    <MDBIcon fas icon={prop.icon}/>
                                                    <p></p>
                                                    <Menu {...bindMenu(popupState)} PaperProps={{
                                                        sx: {
                                                            width: '250px',
                                                            marginLeft: "33px",
                                                            marginTop: "-42px",
                                                            color: "#fff",
                                                            bgcolor: "#004d80"
                                                        }
                                                    }}>

                                                        {!prop.submenu &&
                                                            <MenuItem sx={{
                                                                justifyContent: 'center',
                                                                whiteSpace: 'normal',
                                                                lineHeight: "20px",
                                                                fontSize: "12px",
                                                                fontWeight: 600,
                                                                textTransform: "uppercase"
                                                            }} onClick={popupState.close} component={Link}
                                                                      to={prop.layout + prop.path}>{prop.name} </MenuItem>}

                                                        {prop.submenu && <MenuItem sx={{
                                                            justifyContent: 'center',
                                                            whiteSpace: 'normal',
                                                            lineHeight: "20px",
                                                            fontSize: "12px",
                                                            fontWeight: 600,
                                                            textTransform: "uppercase"
                                                        }}>{prop.name} </MenuItem>}

                                                        {prop.submenu && prop.submenu.map((subProp, subkey) => {
                                                            if (AuthenticationService.hasRole(subProp.roleId))
                                                                return <MenuItem sx={{
                                                                    justifyContent: 'center',
                                                                    whiteSpace: 'normal',
                                                                    lineHeight: "20px",
                                                                    fontSize: "12px",
                                                                    fontWeight: 600,
                                                                    textTransform: "uppercase"
                                                                }} onClick={popupState.close} component={Link}
                                                                                 to={subProp.layout} key={subkey}>
                                                                    <MDBIcon fas
                                                                             icon={subProp.icon}/> &nbsp;&nbsp; {subProp.name}
                                                                </MenuItem>;
                                                        })}

                                                    </Menu>
                                                </NavLink>
                                            </React.Fragment>
                                        )}
                                    </PopupState>

                                </li>
                            );
                        return null;
                    })}
                </Nav>


            </div>
        </div>
    );
}

export default LeftMenu;