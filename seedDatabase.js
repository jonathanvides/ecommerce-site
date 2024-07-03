const { createUser } = require('./controllers/user.js');
const { createAdmin } = require('./controllers/admin.js');
const { createProduct } = require('./controllers/product.js');

const seedDatabase = async () => {
    const testUsers = [
        {
            username: "fred",
            email: "frediscool12@gmail.com",
            password: "password",
            first_name: "Fred",
            last_name: "Smith",
            phone_number: "(111)-111-1111",
        },
        {
            username: "kristen",
            email: "ilovedogs22@gmail.com",
            password: "unknown",
            first_name: "Kristen",
            last_name: "Jones",
            phone_number: "(222)-222-2222",
        },
        {
            username: "andrew",
            email: "sportsenjoyer81@gmail.com",
            password: "secret",
            first_name: "Andrew",
            last_name: "Johnson",
            phone_number: "(333)-333-3333",
        },
        {
            username: "ben",
            email: "happyguy10@gmail.com",
            password: "shhh",
            first_name: "Ben",
            last_name: "Sanders",
            phone_number: "(333)-333-3333",
        },
        {
            username: "sally",
            email: "sportfan22@gmail.com",
            password: "sports",
            first_name: "Sally",
            last_name: "Davidson",
            phone_number: "(333)-333-3333",
        },
    ];

    const testUser = await Promise.all(
        testUsers.map(async (user) => {
            const createdUser = await createUser(user);
            console.log(createdUser);
        })
    );
    console.log(testUser);

    const testAdmins = [
        {
            username: "logan",
            password: "boss",
            first_name: "Logan",
            last_name: "Hernandez",
            permissions: "all"
        },
        {
            username: "don",
            password: "admin1",
            first_name: "Don",
            last_name: "Manning",
            permissions: "all"
        },
        {
            username: "max",
            password: "madmax9",
            first_name: "Max",
            last_name: "Jefferson",
            permissions: "all"
        },
    ];

    const testAdmin = await Promise.all(
        testAdmins.map(async (admin) => {
            const createdAdmin = await createAdmin(admin);
            console.log(createdAdmin);
        })
    );
    console.log(testAdmin);

    const testProducts = [
        {
            name: "Tom Brady Jersey",
            description: "New England Patriots Tom Brady Game Jersey",
            quantity: 10,
            price: 129.99,
            image: "https://fanatics.frgimages.com/new-england-patriots/mens-nike-tom-brady-navy-new-england-patriots-game-retired-player-jersey_pi4725000_ff_4725301-9a225ff9c7cbed5f1e82_full.jpg?_hv=2&w=340",
            category: "NFL"
        },
        {
            name: "Patrick Mahomes Jersey",
            description: "Kansas City Chiefs Patrick Mahomes Game Jersey",
            quantity: 8,
            price: 139.99,
            image: "https://fanatics.frgimages.com/kansas-city-chiefs/mens-nike-patrick-mahomes-red-kansas-city-chiefs-game-jersey_pi3892000_ff_3892890-97e8f397481937adf7a4_full.jpg?_hv=2&w=340",
            category: "NFL"
        },
        {
            name: "Aaron Rodgers Jersey",
            description: "Green Bay Packers Aaron Rodgers Game Jersey",
            quantity: 5,
            price: 129.99,
            image: "https://fanatics.frgimages.com/green-bay-packers/mens-green-bay-packers-aaron-rodgers-nike-green-game-player-jersey_pi825000_ff_825453_full.jpg?_hv=2&w=340",
            category: "NFL"
        },
        {
            name: "LeBron James Jersey",
            description: "Los Angeles Lakers LeBron James Swingman Jersey",
            quantity: 12,
            price: 119.99,
            image: "https://fanatics.frgimages.com/los-angeles-lakers/unisex-nike-lebron-james-gold-los-angeles-lakers-swingman-jersey-icon-edition_ss5_p-200040747+u-9ahuglaastmovr3gjzjv+v-mufnyyuuwjfqiz1ahilj.jpg?_hv=2&w=340",
            category: "NBA"
        },
        {
            name: "Stephen Curry Jersey",
            description: "Golden State Warriors Stephen Curry Swingman Jersey",
            quantity: 9,
            price: 109.99,
            image: "https://fanatics.frgimages.com/golden-state-warriors/unisex-nike-stephen-curry-royal-golden-state-warriors-swingman-jersey-icon-edition_pi4650000_ff_4650408-bce9200a988d4fe31b0d_full.jpg?_hv=2&w=340",
            category: "NBA"
        },
        {
            name: "Kevin Durant Jersey",
            description: "Phoenix Suns Kevin Durant Swingman Jersey",
            quantity: 7,
            price: 119.99,
            image: "https://fanatics.frgimages.com/phoenix-suns/unisex-jordan-brand-kevin-durant-black-phoenix-suns-swingman-jersey-statement-edition_ss5_p-200031305+u-seqgrdjxzw8g92lwxvir+v-ipyxqpu3a0jyvzxq5dj5.jpg?_hv=2&w=340",
            category: "NBA"
        },
        {
            name: "Aaron Judge Jersey",
            description: "New York Yankees Aaron Judge Home Jersey",
            quantity: 10,
            price: 119.99,
            image: "https://fanatics.frgimages.com/new-york-yankees/mens-nike-aaron-judge-white-new-york-yankees-home-replica-player-name-jersey_pi3592000_ff_3592645-11960f417ba69ff98ecc_full.jpg?_hv=2&w=340",
            category: "MLB"
        },
        {
            name: "Mookie Betts Jersey",
            description: "Los Angeles Dodgers Mookie Betts Home Jersey",
            quantity: 6,
            price: 129.99,
            image: "https://fanatics.frgimages.com/los-angeles-dodgers/mens-nike-mookie-betts-white-los-angeles-dodgers-home-limited-player-jersey_ss5_p-200251748+u-btissp52zvholusvkuo8+v-wfgrmjioo9sggmzbhrjr.jpg?_hv=2&w=340",
            category: "MLB"
        },
        {
            name: "Mike Trout Jersey",
            description: "Los Angeles Angels Mike Trout Home Jersey",
            quantity: 8,
            price: 139.99,
            image: "https://fanatics.frgimages.com/los-angeles-angels/mens-nike-mike-trout-white-los-angeles-angels-home-replica-player-name-jersey_pi3592000_ff_3592478-caaf08873960b4901356_full.jpg?_hv=2&w=340",
            category: "MLB"
        },
        {
            name: "Connor McDavid Jersey",
            description: "Edmonton Oilers Connor McDavid Home Jersey",
            quantity: 7,
            price: 169.99,
            image: "https://fanatics.frgimages.com/edmonton-oilers/mens-fanatics-connor-mcdavid-royal-edmonton-oilers-home-breakaway-jersey_ss5_p-201333807+u-zecda1m0xwjr2fp9dx8q+v-gerzebpovfcwhvjxtcw7.jpg?_hv=2&w=340",
            category: "NHL"
        },
        {
            name: "Sidney Crosby Jersey",
            description: "Pittsburgh Penguins Sidney Crosby Home Jersey",
            quantity: 5,
            price: 159.99,
            image: "https://fanatics.frgimages.com/pittsburgh-penguins/mens-fanatics-sidney-crosby-black-pittsburgh-penguins-captain-patch-home-breakaway-jersey_pi5275000_ff_5275446-1d177e8adb1f642ab6aa_full.jpg?_hv=2&w=340",
            category: "NHL"
        },
        {
            name: "Alex Ovechkin Jersey",
            description: "Washington Capitals Alex Ovechkin Home Jersey",
            quantity: 6,
            price: 159.99,
            image: "https://fanatics.frgimages.com/washington-capitals/mens-adidas-alexander-ovechkin-red-washington-capitals-home-primegreen-authentic-player-jersey_pi4260000_ff_4260802-74233f8177366ee3b6c5_full.jpg?_hv=2&w=340",
            category: "NHL"
        },
        {
            name: "Diana Taurasi Jersey",
            description: "Phoenix Mercury Diana Taurasi Rebel Edition Jersey",
            quantity: 4,
            price: 99.99,
            image: "https://fanatics.frgimages.com/phoenix-mercury/unisex-nike-diana-taurasi-black-phoenix-mercury-2024-rebel-edition-player-jersey_ss5_p-200590449+u-2dl1z3spkjhzduo4q1qf+v-sbpffhhecdl2mhzdr9av.jpg?_hv=2&w=340",
            category: "WNBA"
        },
        {
            name: "Breanna Stewart Jersey",
            description: "New York Liberty Breanna Stewart Explorer Edition Jersey",
            quantity: 5,
            price: 99.99,
            image: "https://fanatics.frgimages.com/new-york-liberty/unisex-nike-breanna-stewart%C2%A0black-new-york-liberty-explorer-edition-victory-jersey_ss5_p-200589373+u-ckbnzrkbmfvzxpibkkbl+v-y8nn1hx8jeihdt3tllfu.jpg?_hv=2&w=340",
            category: "WNBA"
        },
        {
            name: "Aja Wilson Jersey",
            description: "Las Vegas Aces Aja Wilson Rebel Edition Jersey",
            quantity: 6,
            price: 99.99,
            image: "https://images.footballfanatics.com/las-vegas-aces/unisex-nike-aja-wilson-black-las-vegas-aces-rebel-edition-victory-player-jersey_pi4067000_altimages_ff_4067715-919a173a4852a0616e93alt1_full.jpg?_hv=2&w=340",
            category: "WNBA"
        }
    ];

    const testProduct = await Promise.all(
        testProducts.map(async (product) => {
            const createdProduct = await createProduct(product);
            console.log(createdProduct);
        })
    );
    console.log(testProduct);

};

module.exports = {
    seedDatabase,
};