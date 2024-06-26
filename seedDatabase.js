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
            address: "ilovedogs22@gmail.com",
            password: "unknown",
            first_name: "Kristen",
            last_name: "Jones",
            phone_number: "(222)-222-2222",
        },
        {
            username: "andrew",
            address: "sportsenjoyer81@gmail.com",
            password: "secret",
            first_name: "Andrew",
            last_name: "Johnson",
            phone_number: "(333)-333-3333",
        },
        {
            username: "ben",
            address: "happyguy10@gmail.com",
            password: "shhh",
            first_name: "Ben",
            last_name: "Sanders",
            phone_number: "(333)-333-3333",
        },
        {
            username: "sally",
            address: "sportfan22@gmail.com",
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
        testAdmin.map(async (admin) => {
            const createdAdmin = await createAdmin(admin);
            console.log(createdAdmin);
        })
    );
    console.log(testAdmin);

    const testProducts = [
        {
            category: "NFL",
            name: "Tom Brady Jersey",
            description: "New England Patriots Tom Brady Game Jersey",
            quantity: 10,
            price: 129.99,
            image: "https://example.com/images/tom_brady_jersey.jpg"
        },
        {
            category: "NFL",
            name: "Patrick Mahomes Jersey",
            description: "Kansas City Chiefs Patrick Mahomes Game Jersey",
            quantity: 8,
            price: 139.99,
            image: "https://example.com/images/patrick_mahomes_jersey.jpg"
        },
        {
            category: "NFL",
            name: "Aaron Rodgers Jersey",
            description: "Green Bay Packers Aaron Rodgers Game Jersey",
            quantity: 5,
            price: 129.99,
            image: "https://example.com/images/aaron_rodgers_jersey.jpg"
        },
        {
            category: "NBA",
            name: "LeBron James Jersey",
            description: "Los Angeles Lakers LeBron James Swingman Jersey",
            quantity: 12,
            price: 119.99,
            image: "https://example.com/images/lebron_james_jersey.jpg"
        },
        {
            category: "NBA",
            name: "Stephen Curry Jersey",
            description: "Golden State Warriors Stephen Curry Swingman Jersey",
            quantity: 9,
            price: 109.99,
            image: "https://example.com/images/stephen_curry_jersey.jpg"
        },
        {
            category: "NBA",
            name: "Kevin Durant Jersey",
            description: "Phoenix Suns Kevin Durant Swingman Jersey",
            quantity: 7,
            price: 119.99,
            image: "https://example.com/images/kevin_durant_jersey.jpg"
        },
        {
            category: "MLB",
            name: "Aaron Judge Jersey",
            description: "New York Yankees Aaron Judge Home Jersey",
            quantity: 10,
            price: 119.99,
            image: "https://example.com/images/aaron_judge_jersey.jpg"
        },
        {
            category: "MLB",
            name: "Mookie Betts Jersey",
            description: "Los Angeles Dodgers Mookie Betts Home Jersey",
            quantity: 6,
            price: 129.99,
            image: "https://example.com/images/mookie_betts_jersey.jpg"
        },
        {
            category: "MLB",
            name: "Mike Trout Jersey",
            description: "Los Angeles Angels Mike Trout Home Jersey",
            quantity: 8,
            price: 139.99,
            image: "https://example.com/images/mike_trout_jersey.jpg"
        },
        {
            category: "NHL",
            name: "Connor McDavid Jersey",
            description: "Edmonton Oilers Connor McDavid Home Jersey",
            quantity: 7,
            price: 169.99,
            image: "https://example.com/images/connor_mcdavid_jersey.jpg"
        },
        {
            category: "NHL",
            name: "Sidney Crosby Jersey",
            description: "Pittsburgh Penguins Sidney Crosby Home Jersey",
            quantity: 5,
            price: 159.99,
            image: "https://example.com/images/sidney_crosby_jersey.jpg"
        },
        {
            category: "NHL",
            name: "Alex Ovechkin Jersey",
            description: "Washington Capitals Alex Ovechkin Home Jersey",
            quantity: 6,
            price: 159.99,
            image: "https://example.com/images/alex_ovechkin_jersey.jpg"
        },
        {
            category: "WNBA",
            name: "Diana Taurasi Jersey",
            description: "Phoenix Mercury Diana Taurasi Rebel Edition Jersey",
            quantity: 4,
            price: 99.99,
            image: "https://example.com/images/diana_taurasi_jersey.jpg"
        },
        {
            category: "WNBA",
            name: "Breanna Stewart Jersey",
            description: "New York Liberty Breanna Stewart Rebel Edition Jersey",
            quantity: 5,
            price: 99.99,
            image: "https://example.com/images/breanna_stewart_jersey.jpg"
        },
        {
            category: "WNBA",
            name: "Aja Wilson Jersey",
            description: "Las Vegas Aces Aja Wilson Rebel Edition Jersey",
            quantity: 6,
            price: 99.99,
            image: "https://example.com/images/aja_wilson_jersey.jpg"
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