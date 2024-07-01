import React, { useState } from "react";
import { userSignup } from "../API/user";
import { useNavigate } from "react-router-dom";
import { setToken } from "./auth";
import { fetchCart } from "../API/cart";

const Register = ({ setUserId, setUserCartId }) => {
    const navigate = useNavigate();
    const [registerFormData, setRegisterFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await userSignup(registerFormData);
            console.log(data);
            console.log(data.userDetails.id);
            console.log(data.token);

            if (data) {
                setUserId(data.userDetails.id);
                setToken(data.token);

                const userCart = await fetchCart(data.userDetails.id, data.token);
                setUserCartId(userCart.id);

                navigate('/account');
            } else {
                console.error('Registration error.');
            }
        } catch (error) {
            console.error(error);
        }

        setRegisterFormData({
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phone_number: ''
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    console.log(registerFormData);

    return (
        <div>
            <h1>Sign Up!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    onChange={handleChange}
                    value={registerFormData.username}
                    placeholder="Username"
                />
                <input
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    value={registerFormData.first_name}
                    placeholder="First Name"
                />
                <input
                    name="last_name"
                    type="text"
                    onChange={handleChange}
                    value={registerFormData.last_name}
                    placeholder="Last Name"
                />
                <input
                    name="email"
                    type="text"
                    onChange={handleChange}
                    value={registerFormData.email}
                    placeholder="Email"
                />
                <input
                    name="phone_number"
                    type="text"
                    onChange={handleChange}
                    value={registerFormData.phone_number}
                    placeholder="Phone Number"
                />
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={registerFormData.password}
                    placeholder="Password"
                />
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
