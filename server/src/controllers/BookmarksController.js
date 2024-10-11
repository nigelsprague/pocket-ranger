import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bookmarksService } from "../services/BookmarksService.js";

export class ArticlesController extends BaseController {
  constructor() {
    super('api/bookmarks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBookmark)
      .delete('/:bookmarkId', this.deleteBookmark)
  } 

  async createBookmark(request, response, next) {
    try {
      const bookmarkData = request.body
      bookmarkData.creatorId = request.userInfo.id
      const bookmark = await bookmarksService.createBookmark(bookmarkData)
      response.send(bookmark)
    } catch (error) {
      next(error)
    }
  }

  async deleteBookmark(request, response, next) {
    try {
      const bookmarkId = request.params.bookmarkId
      const userId = request.userInfo.id
      const message = await bookmarksService.deleteBookmark(bookmarkId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}