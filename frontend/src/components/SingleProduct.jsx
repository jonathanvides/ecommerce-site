import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../API/product";
import { addCartItem } from "../API/cart";
import { getToken } from "./auth";

const Product = ({ userCartId }) => {
    const token = getToken();
    const [selectedProduct, setSelectedProduct] = useState(null);
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

    const handleAddCartClick = async () => {
        if (!token) {
            navigate('/login')
            return
        }
        try {
            const addItem = await addCartItem(token, userCartId, selectedProduct.id, 1);
            console.log(addItem);
            navigate('/');
        } catch (error) {
            console.error('Error adding item:', error)
        }
    }

    return (
        <div>
            <h1 className="single-name">{selectedProduct.name}</h1>
            <img className="single-image" src={selectedProduct.image} alt={selectedProduct.name} />
            <h4 className="single-description">{selectedProduct.description}</h4>
            <h2 className="single-price">${selectedProduct.price}</h2>
            <button className="add-to-cart" onClick={handleAddCartClick}>Add to Cart</button>
        </div>
    );
};

export default Product;