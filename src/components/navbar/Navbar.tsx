import React from "react";
import { NavbarProps } from "./NavbarProps";

import './Navbar.scss';
import { NavLink } from "react-router-dom";

const Navbar = (props: NavbarProps) => {
    return (
        <React.Fragment>
            <div className="navbar">
                <h1 className="navbar__logo"> </h1>
                <div className="navbar__content">
                    <ul className="navbar__content__list">
                        <NavLink 
                            to="/chat"
                            className="navbar__content__list__item">
                            Chat
                        </NavLink>
                        <NavLink 
                            to="/document"
                            className="navbar__content__list__item">
                            Documents
                        </NavLink>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Navbar;