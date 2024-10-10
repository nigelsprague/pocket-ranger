import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:postId', this.deletePost)
  }
  async deletePost(request, response, next) {
    try {
      const postId = request.params.postId
      const user = request.userInfo
      const message = await postsService.deletePost(postId, user.id)
      response.send(message)
    }
    catch (error) {
      next(error);
    }
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