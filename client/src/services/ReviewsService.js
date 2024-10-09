import { api } from "./AxiosService.js"
import { Review } from "@/models/Review.js"
import { AppState } from "@/AppState.js"

class ReviewsService {
  async createReview(reviewData) {
    const response = await api.post(`api/reviews`, reviewData)
    const createReview = new Review(response.data)
    AppState.reviews.push(createReview)
    return createReview
  }

}

export const reviewsService = new ReviewsService()