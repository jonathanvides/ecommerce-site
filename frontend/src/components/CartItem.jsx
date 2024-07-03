import React, { useState } from "react";
import { deleteCartItem, updateCartItem } from "../API/cart";
import { getToken } from "./auth";

const CartItem = ({ item, refresh }) => {
    const token = getToken();
    const [itemQty, setItemQty] = useState(item.quantity);

    console.log(item);

    const handleQtyChange = async (event) => {
        const newQuantity = parseInt(event.target.value);
        setItemQty(newQuantity);
        refresh();
        try {
            await updateCartItem(item.id, newQuantity, token);
            console.log('Item quantity updated successfully.');
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const buttonClickHandler = async () => {
        try {
            await deleteCartItem(item.id, token);
            refresh();
            console.log('Item deleted successfully');
        } catch (error) {
            console.error('Failed to remove cart item:', error);
        }
    };

    return (
        <div>
            <img src={item.product_image} alt={item.product_name} />
            <h4>{item.product_name}</h4>
            <p>{item.product_description}</p>
            <div>
                <p>{`Price: $${item.product_price}`}</p>
                <p>{`Total: $${item.product_price * item.quantity}`}</p>
            </div>
            <select value={itemQty} onChange={handleQtyChange}>
                {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
            </select>
            <div>
                <button onClick={buttonClickHandler}>Remove Item</button>
            </div>
        </div>
    );
};

export { CartItem };