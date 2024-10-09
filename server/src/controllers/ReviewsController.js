import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { reviewsService } from "../services/ReviewsService.js";

export class ReviewsController extends BaseController {
  constructor() {
    super('api/reviews')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createReview)
      .delete('/:reviewId', this.deleteReview)
  }

  async createReview(request, response, next) {
    try {
      const reviewData = request.body
      const userInfo = request.userInfo
      reviewData.creatorId = userInfo.id
      const review = await reviewsService.createReview(reviewData)
      response.send(review)
    }
    catch (error) {
      next(error)
    }
  }

  async deleteReview(request, response, next) {
    try {
      const reviewId = request.params.reviewId
      const userId = request.userInfo.id
      const message = await reviewsService.deleteReview(reviewId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}