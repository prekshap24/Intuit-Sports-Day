import React from "react";
import LeftMenu from "./LeftMenu";
import AdminNavbar from "../navbars/AdminNavbar";

function MainLayout() {
    return (

        <div>
            <AdminNavbar></AdminNavbar>
            <LeftMenu></LeftMenu>
        </div>
    )

}

export default MainLayout;