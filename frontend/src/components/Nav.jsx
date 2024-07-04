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
                    <Link to ="/" className="website-title">Champ Spot </Link>
                    <Link to="/" className="navbar-home">
                        Home
                    </Link>
                    <Link to="/account" className="navbar-acc">
                        Account
                    </Link>
                    <Link to="/cart" className="navbar-cart">
                        Cart
                    </Link>
                    <button className="navbar-logout" onClick={logoutHandler}>
                        Logout
                    </button>
            </div>
        </nav>
    );
};

export default Navbar;