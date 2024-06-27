import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../API/user";
import { setToken } from "./auth";

const Login = ({ setUserId }) => {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await userLogin(loginFormData);
            console.log(data);

            if (data) {
                setUserId(data.userDetails.id);
                setToken(data.token);
                navigate('/account');
            } else {
                console.error('Log in error.');
            }
        } catch (error) {
            console.error(error);
        }

        setLoginFormData({
            email: '',
            password: ''
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h1>
                Welcome!
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="text"
                    onChange={handleChange}
                    value={loginFormData.email}
                    placeholder="Email"
                />
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={loginFormData.password}
                    placeholder="Password"
                />

                <button>Login</button>
            </form>
            <h3>
                Not a member yet?
                <Link to="/signup" className="signup-link">
                    CREATE ACCOUNT
                </Link>
            </h3>
        </div>
    );
};

export default Login;