import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { Article } from "@/models/Article.js"
import { AppState } from "@/AppState.js"
import { pagesService } from "./PagesService.js"

class ArticlesService {

  limit = 10
  async changeArticlesPage(pageNumber, parkCode) {
    const response = await npsAPI.get(`/articles/?parkcode=${parkCode}&start=${10 * (pageNumber - 1)}&limit=${this.limit}`)
    logger.log('Changed articles page - article service', response.data)
    const newArticle = response.data.data.map(articleData => new Article(articleData))
    AppState.articles = newArticle.reverse()
    pagesService.savePages(response.data, this.limit)
  }

  async getArticleByCode(parkCodes) {
    const responseForTotal = await npsAPI.get(`/articles/?parkcode=${parkCodes}&limit=1`);
    const total = parseInt(responseForTotal.data.total);

    // TODO Pagination
    let start = total - this.limit
    if (start < 1) {
      start = 0;
    }
    const response = await npsAPI.get(`/articles/?parkcode=${parkCodes}&start=${start}&limit=${this.limit}`)
    logger.log('Got articles - article service', response.data)
    const newArticle = response.data.data.map(articleData => new Article(articleData))
    AppState.articles = newArticle.reverse()
    pagesService.savePages(response.data, this.limit)
  }

}

export const articlesService = new ArticlesService()