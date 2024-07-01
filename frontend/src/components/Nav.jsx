import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;