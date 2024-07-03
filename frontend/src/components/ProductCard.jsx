import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate(`/products/${product.id}`)
    }

    return (
        <div className="product-card" onClick={handleViewClick}>
            <h1 className="product-name">{product.name}</h1>
            <img className="image" src={product.image} alt={product.name} />
            <h2 className="price">${product.price}</h2>
        </div>
    );
};

export { ProductCard };