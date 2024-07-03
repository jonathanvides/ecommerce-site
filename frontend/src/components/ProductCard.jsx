import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate(`/products/${product.id}`)
    }

    return (
        <div onClick={handleViewClick}>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <h2>${product.price}</h2>
        </div>
    );
};

export { ProductCard };