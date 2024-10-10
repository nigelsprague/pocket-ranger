import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class ReviewsService {
  async deleteReview(reviewId, userId) {
    const reviewToDelete = await dbContext.Reviews.findById(reviewId)
    if (!reviewToDelete) throw Error(`Could not delete, no review with id: ${reviewId}`)
    if (userId != reviewToDelete.creatorId) throw new Forbidden(`Not your review to delete`)
    await reviewToDelete.deleteOne()
    return 'You deleted your review!'
  }
  
  async getReviewsByCode(parkCode) {
    const review = await dbContext.Reviews.find({ parkCode: parkCode }).populate('creator')
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