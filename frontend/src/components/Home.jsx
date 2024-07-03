import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from '../API/product';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProductsData = async () => {
            const allProducts = await fetchAllProducts();
            setProducts(allProducts);
            setFilteredProducts(allProducts);
        };

        fetchProductsData();
    }, []);

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );

        setFilteredProducts(filtered);
    };

    return (
        <div className="container">
            <section className="search">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </section>
            <section>
                <div className="product">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2>Our Mission</h2>
                <p>
                    Our mission is to provide loyal, passionate fans, dedicated to their favorite teams and to the sports they love with our collection of official sports apparel from all the leagues, teams and players they love. At ChampSpot, we're more than just a sport store, we're fans who have been there through the biggest upsets and the most epic moments, and we cherish the opportunity to help create unforgettable memories. Through our commitment to our community, we strive to be the ultimate destination for sports enthusiasts seeking to find the right sports apparel for them.
                </p>
            </section>
        </div>
    );
};

export default Home;