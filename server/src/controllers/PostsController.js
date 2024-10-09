import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
  }

  async createPost(request, response, next) {
    try {
      const postData = request.body;
      const userInfo = request.userInfo
      postData.creatorId = userInfo.id;
      const post = await postsService.createPost(postData);
      response.send(post);
    }
    catch (error) {
      next(error);
    }
  }
}