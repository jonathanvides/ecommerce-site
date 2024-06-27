import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchAllProducts } from "../API/product";
import { ProductCard } from "./ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const fetchProducts = await fetchAllProducts()
                console.log(fetchProducts);
                setProducts(fetchProducts);
                setFilteredProducts(fetchProducts);
            } catch (error) {
                console.error(error)
            }
        }
        getProducts()
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchTermQuery = params.get('search') || '';
        const filter = products.filter(product =>
            product.name.toLowerCase().includes(searchTermQuery.toLocaleLowerCase())
        );
        setFilteredProducts(filter)
    }, [products, location.search]);

    return (
        <div>
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Products