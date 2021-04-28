const express = require('express')
const router = express.Router({ mergeParams: true })

const catchAsync = require('../utils/catchAsync')
const reviews = require('../controllers/reviews')

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

// REVIEW ROUTS
// Creating a Review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// Deleting a Review
router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
)

module.exports = router
