const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      author: '607b0dfc2d246e2a40e37bc8',
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur veritatis quia ut totam tempore neque similique mollitia autem odio laboriosam sapiente cupiditate magnam nostrum aut, ad placeat assumenda vitae omnis? Inventore vero ex ea adipisci deserunt fuga delectus esse perferendis veniam molestias repudiandae temporibus qui libero eligendi nihil reprehenderit cupiditate repellat nesciunt, ipsam error quo voluptatibus. Enim omnis dicta quo?',
      images: [
        {
          url:
            'https://res.cloudinary.com/dp1wjkhmr/image/upload/v1619440032/YelpCamp/udigzifi3oepjphit7ty.jpg',
          filename: 'YelpCamp/udigzifi3oepjphit7ty',
        },
        {
          url:
            'https://res.cloudinary.com/dp1wjkhmr/image/upload/v1619440064/YelpCamp/ytbc2mtvgqscctshly3x.jpg',
          filename: 'YelpCamp/ytbc2mtvgqscctshly3x',
        },
        {
          url:
            'https://res.cloudinary.com/dp1wjkhmr/image/upload/v1619440063/YelpCamp/pgwmvovalodth44gwy8u.jpg',
          filename: 'YelpCamp/pgwmvovalodth44gwy8u',
        },
      ],
      price,
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
