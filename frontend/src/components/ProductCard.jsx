import React from "react";
import { BASE_URL } from '../API/url';
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const imageUrl = `${BASE_URL}${product.image}`;

    const handleViewClick = () => {
        navigate(`/products/${product.id}`)
    }

    return (
        <div onClick={handleViewClick}>
            <h1>{product.name}</h1>
            {imageUrl} 
            <h2>${product.price}</h2>
        </div>
    );
};

export { ProductCard };