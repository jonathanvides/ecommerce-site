import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const featuredProducts = [
        {
            id: 1,
            name: "Patrick Mahomes Jersey",
            description: "Kansas City Chiefs Patrick Mahomes Game Jersey",
            price: 139.99,
            image: "https://example.com/images/patrick_mahomes_jersey.jpg"
        },
        {
            id: 2,
            name: "LeBron James Jersey",
            description: "Los Angeles Lakers LeBron James Swingman Jersey",
            price: 119.99,
            image: "https://example.com/images/lebron_james_jersey.jpg"
        },
        {
            id: 3,
            name: "Connor McDavid Jersey",
            description: "Edmonton Oilers Connor McDavid Home Jersey",
            price: 169.99,
            image: "https://example.com/images/connor_mcdavid_jersey.jpg"
        },
    ];

    const bestSellers = [
        {
            id: 4,
            name: "Tom Brady Jersey",
            description: "New England Patriots Tom Brady Game Jersey",
            price: 129.99,
            image: "https://example.com/images/tom_brady_jersey.jpg"
        },
        {
            id: 5,
            name: "Stephen Curry Jersey",
            description: "Golden State Warriors Stephen Curry Swingman Jersey",
            price: 109.99,
            image: "https://example.com/images/stephen_curry_jersey.jpg"
        },
        {
            id: 6,
            name: "Aaron Judge Jersey",
            description: "New York Yankees Aaron Judge Home Jersey",
            price: 119.99,
            image: "https://example.com/images/aaron_judge_jersey.jpg"
        },
    ];

    const newArrivals = [
        {
            id: 7,
            name: "Aja Wilson Jersey",
            description: "Las Vegas Aces Aja Wilson Rebel Edition Jersey",
            price: 99.99,
            image: "https://example.com/images/aja_wilson_jersey.jpg"
        },
        {
            id: 8,
            name: "Mookie Betts Jersey",
            description: "Los Angeles Dodgers Mookie Betts Home Jersey",
            price: 129.99,
            image: "https://example.com/images/mookie_betts_jersey.jpg"
        },
        {
            id: 9,
            name: "Breanna Stewart Jersey",
            description: "New York Liberty Breanna Stewart Rebel Edition Jersey",
            price: 99.99,
            image: "https://example.com/images/breanna_stewart_jersey.jpg"
        },
    ];

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="container">
            <section className="mission-statement">
                <h2>Our Mission</h2>
                <p>
                    Our mission is to provide loyal, passionate fans, dedicated to their favorite teams and to the sports they love with our collection of official sports apparel from all the leagues, teams and players they love. At ChampSpot, we're more than just a sport store, we're fans who have been there through the biggest upsets and the most epic moments, and we cherish the opportunity to help create unforgettable memories. Through our commitment to our community, we strive to be the ultimate destination for sports enthusiasts seeking to find the right sports apparel for them.
                </p>
            </section>
            <section className="section">
                <h2>Featured Products</h2>
                <div className="product-grid">
                    {featuredProducts.map((product) => (
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
            <section className="section">
                <h2>Best Sellers</h2>
                <div className="product-grid">
                    {bestSellers.map((product) => (
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
            <section className="section">
                <h2>New Arrivals</h2>
                <div className="product-grid">
                    {newArrivals.map((product) => (
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
        </div>
    );
};

export default Home;