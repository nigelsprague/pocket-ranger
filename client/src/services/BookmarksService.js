import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Bookmarks } from "@/models/Bookmarks.js"
import { AppState } from "@/AppState.js"

class BookmarksService {
  async deleteBookmark(bookmarkId) {
    const response = await api.delete(`api/bookmarks/${bookmarkId}`)
    const indexToDelete = AppState.bookmarks.findIndex(bookmark => bookmark.id == bookmarkId)
    AppState.bookmarks.splice(indexToDelete, 1)
    return response.data
  }
  async createBookmark(bookmarkData) {
    const response = await api.post('api/bookmarks', bookmarkData)
    logger.log('Creating Bookmark', response.data)
    const createdBookmark = new Bookmarks(response.data)
    AppState.bookmarks.push(createdBookmark)
  }

  async getAccountBookmarks() {
    const response = await api.get(`account/bookmarks`)
    logger.log(`Getting account bookmarks`, response.data)
    const accountBookmarks = response.data.map(bookmarkData => new Bookmarks(bookmarkData))
    AppState.bookmarks = accountBookmarks
    logger.log('Account Bookmarks 222', accountBookmarks)
  }
}

export const bookmarksService = new BookmarksService()