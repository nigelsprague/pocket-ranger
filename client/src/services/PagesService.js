import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

class PagesService {
  savePages(responseData, limit = 10) {
    logger.log(responseData)
    AppState.displayCurrentPage = Math.ceil((responseData.total - responseData.start) / responseData.limit)
    AppState.currentPage = Math.ceil(parseInt(responseData.start) / limit) + 1
    AppState.totalPages = Math.ceil(responseData.total / limit)
  }
}

export const pagesService = new PagesService()