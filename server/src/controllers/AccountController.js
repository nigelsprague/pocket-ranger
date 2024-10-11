import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { followersService } from '../services/FollowersService'
import { bookmarksService } from '../services/BookmarksService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/followers', this.getAccountFollows)
      .get('/bookmarks', this.getAccountBookmarks)
      .put('', this.editUserAccount)
  }

  async getAccountBookmarks(request, response, next) {
    try {
      const userId = request.userInfo.id
      const bookmarks = await bookmarksService.getAccountBookmarks(userId)
      response.send(bookmarks)
    } catch (error) {
      next(error)
    }
  }

  async getAccountFollows(request, response, next) {
    try {
      const creator = request.userInfo
      const followers = await followersService.getAccountFollows(creator.id)
      response.send(followers)
    }
    catch (error) {
      next(error);
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

}
