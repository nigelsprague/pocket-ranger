import { dbContext } from "../db/DbContext.js"

class BookmarksService{
  deleteBookmark(bookmarkId, userId) {
    throw new Error("Method not implemented.")
  }
  async createBookmark(bookmarkData) {
    const bookmark = await dbContext.Bookmarks.create(bookmarkData)
    await bookmark.populate('creator')
    return bookmark
  }

}

export const bookmarksService = new BookmarksService()