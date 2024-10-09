import { dbContext } from "../db/DbContext.js"

class ReviewsService {
  async getReviewsByCode(parkCode) {
    const review = await dbContext.Reviews.find({ parkCode: parkCode })
    return review
  }

  async createReview(reviewData) {
    const review = await dbContext.Reviews.create(reviewData)
    await review.populate('creator')
    await review.populate('park')
    return review
  }

}

export const reviewsService = new ReviewsService()