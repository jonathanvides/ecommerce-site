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
            image: "https://fanatics.frgimages.com/kansas-city-chiefs/mens-nike-patrick-mahomes-red-kansas-city-chiefs-game-jersey_pi3892000_ff_3892890-97e8f397481937adf7a4_full.jpg?_hv=2&w=340"
        },
        {
            id: 2,
            name: "LeBron James Jersey",
            description: "Los Angeles Lakers LeBron James Swingman Jersey",
            price: 119.99,
            image: "https://fanatics.frgimages.com/los-angeles-lakers/unisex-nike-lebron-james-gold-los-angeles-lakers-swingman-jersey-icon-edition_ss5_p-200040747+u-9ahuglaastmovr3gjzjv+v-mufnyyuuwjfqiz1ahilj.jpg?_hv=2&w=340"
        },
        {
            id: 3,
            name: "Connor McDavid Jersey",
            description: "Edmonton Oilers Connor McDavid Home Jersey",
            price: 169.99,
            image: "https://fanatics.frgimages.com/edmonton-oilers/mens-fanatics-connor-mcdavid-royal-edmonton-oilers-home-breakaway-jersey_ss5_p-201333807+u-zecda1m0xwjr2fp9dx8q+v-gerzebpovfcwhvjxtcw7.jpg?_hv=2&w=340"
        },
    ];

    const bestSellers = [
        {
            id: 4,
            name: "Tom Brady Jersey",
            description: "New England Patriots Tom Brady Game Jersey",
            price: 129.99,
            image: "https://fanatics.frgimages.com/new-england-patriots/mens-nike-tom-brady-navy-new-england-patriots-game-retired-player-jersey_pi4725000_ff_4725301-9a225ff9c7cbed5f1e82_full.jpg?_hv=2&w=340"
        },
        {
            id: 5,
            name: "Stephen Curry Jersey",
            description: "Golden State Warriors Stephen Curry Swingman Jersey",
            price: 109.99,
            image: "https://fanatics.frgimages.com/golden-state-warriors/unisex-nike-stephen-curry-royal-golden-state-warriors-swingman-jersey-icon-edition_pi4650000_ff_4650408-bce9200a988d4fe31b0d_full.jpg?_hv=2&w=340"
        },
        {
            id: 6,
            name: "Aaron Judge Jersey",
            description: "New York Yankees Aaron Judge Home Jersey",
            price: 119.99,
            image: "https://fanatics.frgimages.com/new-york-yankees/mens-nike-aaron-judge-white-new-york-yankees-home-replica-player-name-jersey_pi3592000_ff_3592645-11960f417ba69ff98ecc_full.jpg?_hv=2&w=340"
        },
    ];

    const newArrivals = [
        {
            id: 7,
            name: "Aja Wilson Jersey",
            description: "Las Vegas Aces Aja Wilson Rebel Edition Jersey",
            price: 99.99,
            image: "https://images.footballfanatics.com/las-vegas-aces/unisex-nike-aja-wilson-black-las-vegas-aces-rebel-edition-victory-player-jersey_pi4067000_altimages_ff_4067715-919a173a4852a0616e93alt1_full.jpg?_hv=2&w=340"
        },
        {
            id: 8,
            name: "Mookie Betts Jersey",
            description: "Los Angeles Dodgers Mookie Betts Home Jersey",
            price: 129.99,
            image: "https://fanatics.frgimages.com/los-angeles-dodgers/mens-nike-mookie-betts-white-los-angeles-dodgers-home-limited-player-jersey_ss5_p-200251748+u-btissp52zvholusvkuo8+v-wfgrmjioo9sggmzbhrjr.jpg?_hv=2&w=340"
        },
        {
            id: 9,
            name: "Breanna Stewart Jersey",
            description: "New York Liberty Breanna Stewart Explorer Edition Jersey",
            price: 99.99,
            image: "https://fanatics.frgimages.com/new-york-liberty/unisex-nike-breanna-stewart%C2%A0black-new-york-liberty-explorer-edition-victory-jersey_ss5_p-200589373+u-ckbnzrkbmfvzxpibkkbl+v-y8nn1hx8jeihdt3tllfu.jpg?_hv=2&w=340"
        },
    ];

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="container">
            <section className="section">
                <h2>Featured Products</h2>
                <div>
                    {featuredProducts.map((featuredProducts) => (
                        <div
                            key={featuredProducts.id}
                            className="product-card"
                            onClick={() => handleProductClick(featuredProducts.id)}
                        >
                            <img src={featuredProducts.image} alt={featuredProducts.name} />
                            <h3>{featuredProducts.name}</h3>
                            <p>${featuredProducts.price}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="section">
                <h2>Best Sellers</h2>
                <div>
                    {bestSellers.map((bestSellers) => (
                        <div
                            key={bestSellers.id}
                            className="product-card"
                            onClick={() => handleProductClick(bestSellers.id)}
                        >
                            <img src={bestSellers.image} alt={bestSellers.name} />
                            <h3>{bestSellers.name}</h3>
                            <p>${bestSellers.price}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="section">
                <h2>New Arrivals</h2>
                <div>
                    {newArrivals.map((newArrivals) => (
                        <div
                            key={newArrivals.id}
                            className="product-card"
                            onClick={() => handleProductClick(newArrivals.id)}
                        >
                            <img src={newArrivals.image} alt={newArrivals.name} />
                            <h3>{newArrivals.name}</h3>
                            <p>${newArrivals.price}</p>
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