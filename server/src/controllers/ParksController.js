import { followersService } from "../services/FollowersService.js";
import BaseController from "../utils/BaseController.js";

export class ParksController extends BaseController {
  constructor() {
    super('api/park');
    this.router
      .get('/:parkCode/followers', this.getFollowersByCode)
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
}