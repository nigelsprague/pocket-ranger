import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class BookmarksService {
  async createBookmark(bookmarkData) {
    const response = await api.post('api/bookmarks', bookmarkData)
    logger.log('Creating Bookmark', response.data)
  }
}

export const bookmarksService = new BookmarksService()