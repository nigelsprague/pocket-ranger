import { AppState } from "@/AppState.js"

class PagesService {
  savePages(responseData, limit = 10) {
    AppState.currentPage = Math.ceil(parseInt(responseData.start) / limit) + 1
    AppState.totalPages = Math.ceil(responseData.total / limit)
  }
}

export const pagesService = new PagesService()