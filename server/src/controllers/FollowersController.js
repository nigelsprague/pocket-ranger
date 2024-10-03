import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { followersService } from "../services/FollowersService.js";

export class FollowersController extends BaseController {
  constructor() {
    super('api/followers');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createFollower)
  }

  async createFollower(request, response, next) {
    try {
      const followerData = request.body;
      followerData.creatorId = request.userInfo.id;
      const follower = await followersService.createFollower(followerData);
      response.send(follower);
    } catch (error) {
      next(error);
    }
  }
}