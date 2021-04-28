const mongoose = require('mongoose')
const Review = require('./review')
const { Schema } = mongoose

// https://res.cloudinary.com/dp1wjkhmr/image/upload/w_200/v1618927291/YelpCamp/x6iyvmssdbz1dlbq8ine.jpg

const imageSchema = new Schema({
  url: String,
  filename: String,
})

const opts = { toJSON: { virtuals: true } }

imageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200')
})

const campgroundSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    location: String,
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [imageSchema],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  opts
)

campgroundSchema.virtual('properties.popUpMarkup').get(function () {
  return `
  <strong><a href='/campgrounds/${this._id}'>${this.title}</a></strong>
  <p>${this.description.substring(0, 20)}...</p>
  `
})

campgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    })
  }
})

module.exports = mongoose.model('Campground', campgroundSchema)
