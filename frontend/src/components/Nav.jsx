import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "./auth"

const Navbar = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        removeToken();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div>
                    <Link to="/" className="navbar">
                        Home
                    </Link>
                    <Link to="/account" className="navbar">
                        Account
                    </Link>
                    <Link to="/cart" className="navbar">
                        Cart
                    </Link>
                    <button className="navbar-logout" onClick={logoutHandler}>
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;