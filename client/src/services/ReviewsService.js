import { api } from "./AxiosService.js"
import { Review } from "@/models/Review.js"
import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

class ReviewsService {
  async deleteReview(reviewId) {
    const response = await api.delete(`api/reviews/${reviewId}`)
    logger.log('Deleting review', response.data)
    const indexToDelete = AppState.reviews.findIndex(review => review.id == reviewId)
    AppState.reviews.splice(indexToDelete, 1)
  }
  
  async createReview(reviewData) {
    const response = await api.post(`api/reviews`, reviewData)
    const createReview = new Review(response.data)
    AppState.reviews.push(createReview)
    logger.log(createReview)
    return createReview
  }

  async getReviewsByPark(parkCode) {
    const response = await api.get(`api/park/${parkCode}/reviews`)
    logger.log('What am I getting?', response.data)
    const newReview = response.data.map(reviewData => new Review(reviewData))
    AppState.reviews = newReview
  }


}

export const reviewsService = new ReviewsService()