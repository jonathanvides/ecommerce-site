// Add cart functionality to move product to user cart

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../API/product";
import { BASE_URL } from "../API/url";
import { getToken } from "./auth";

const Product = ({ userId }) => {
    const token = getToken();
    const [selectedProduct, setSelectedProduct] = useState('');
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getProductById = async () => {
            try {
                const fetchedProduct = await fetchProduct(productId);
                console.log(fetchedProduct);
                setSelectedProduct(fetchedProduct);
            } catch (error) {
                setSelectedProduct('');
                console.error('Failed to fetch product.', error);
            }
        };

        if (productId) {
            getProductById();
        }
    }, [productId]);

    if (!selectedProduct) {
        return <div>Product Not Found.</div>;
    };

    const imageUrl = `${BASE_URL}${selectedProduct.image}`;

    return (
        <div>
            <h1>{selectedProduct.name}</h1>
            {imageUrl}
            <h4>{selectedProduct.description}</h4>
            <h2>${selectedProduct.price}</h2>
        </div>  
    );
};

export default Product;