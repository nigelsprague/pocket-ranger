import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { Article } from "@/models/Article.js"
import { AppState } from "@/AppState.js"
import { pagesService } from "./PagesService.js"

class ArticlesService {

  limit = 10
  start = 0
  async changeArticlesPage(pageNumber, parkCode) {
    let pageStart = this.start - (this.limit * (pageNumber - 1));
    let pageLimit = this.limit;
    if (pageStart < 1) {
      pageLimit = pageLimit + pageStart;
      pageStart = 0;
    }
    const response = await npsAPI.get(`/articles/?parkcode=${parkCode}&start=${pageStart}&limit=${pageLimit}`)
    logger.log('Changed articles page - article service', response.data)
    const newArticle = response.data.data.map(articleData => new Article(articleData))
    AppState.articles = newArticle.reverse()
    response.data.limit = this.limit;
    pagesService.savePages(response.data, this.limit)
  }

  async getArticleByCode(parkCodes) {
    const responseForTotal = await npsAPI.get(`/articles/?parkcode=${parkCodes}&limit=1`);
    const total = parseInt(responseForTotal.data.total);
    this.start = total - this.limit;

    const response = await npsAPI.get(`/articles/?parkcode=${parkCodes}&start=${this.start}&limit=${this.limit}`)
    logger.log('Got articles - article service', response.data)
    const newArticle = response.data.data.map(articleData => new Article(articleData))
    AppState.articles = newArticle.reverse()
    pagesService.savePages(response.data, this.limit)
  }

}

export const articlesService = new ArticlesService()