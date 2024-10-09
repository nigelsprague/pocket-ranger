import { followersService } from "../services/FollowersService.js";
import { postsService } from "../services/PostsService.js";
import BaseController from "../utils/BaseController.js";

export class ParksController extends BaseController {
  constructor() {
    super('api/park');
    this.router
      .get('/:parkCode/followers', this.getFollowersByCode)
      .get('/:parkCode/posts', this.getPostsByCode)
  }

  async getFollowersByCode(request, response, next) {
    try {
      const parkCode = request.params.parkCode;
      const followers = await followersService.getFollowersByCode(parkCode);
      response.send(followers);
    } catch (error) {
      next(error);
    }
  }

  async getPostsByCode(request, response, next) {
    try {
      const parkCode = request.params.parkCode
      const posts = await postsService.getPostsByCode(parkCode)
      response.send(posts)
    }
    catch (error) {
      next(error);
    }
  }
}