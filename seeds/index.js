const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '60097b3de96dec014c005164',
            location: `${cities[random1000].city}, ${cities[random1000].state}`, 
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque impedit nobis vero voluptatum deleniti sint recusandae unde mollitia facere, omnis voluptatibus nostrum quasi, molestiae fugiat obcaecati dolorum. Eaque, illo accusantium!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            images: [{
                    url: 'https://res.cloudinary.com/gilvas-filho/image/upload/v1611498114/YelpCamp/eqdxzibyejxz7gr1trxk.jpg',
                    filename: 'YelpCamp/eqdxzibyejxz7gr1trxk'
                },
                {
                    url: 'https://res.cloudinary.com/gilvas-filho/image/upload/v1611498116/YelpCamp/dpmk3i4whkkan0ezhqi8.jpg',
                    filename: 'YelpCamp/dpmk3i4whkkan0ezhqi8'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
