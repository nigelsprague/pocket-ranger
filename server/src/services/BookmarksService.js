import { dbContext } from "../db/DbContext.js"
import { BadRequest, NotFound } from "../utils/Errors.js"

class BookmarksService {
  async getAccountBookmarks(userId) {
    const bookmarks = await dbContext.Bookmarks.find({ creatorId: userId }).populate('article')
    return bookmarks
  }

  async createBookmark(bookmarkData) {
    // const currentBookmarks = await this.getAccountBookmarks(bookmarkData.userId)
    const bookmark = await dbContext.Bookmarks.create(bookmarkData)
    await bookmark.populate('creator')
    await bookmark.populate('article')
    return bookmark
  }

  async deleteBookmark(bookmarkId, userId) {
    const bookmarkToDelete = await dbContext.Bookmarks.findById(bookmarkId)
    if (!bookmarkToDelete) {
      throw new NotFound('No bookmark found.')
    }
    if (bookmarkToDelete.creatorId != userId) {
      throw new BadRequest(`Can't delete bookmarks of different users.`)
    }
    await bookmarkToDelete.deleteOne()
    return 'Bookmark deleted'
  }

}

export const bookmarksService = new BookmarksService()