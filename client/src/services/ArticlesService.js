import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { Article } from "@/models/Article.js"
import { AppState } from "@/AppState.js"

class ArticlesService {
  // async getArticleByFavorites(favoritedParks) {
  //   const limit = 10
  //   const response = await npsAPI.get(`/articles/?limit=${limit}&parkcode=${favoritedParks}`)
  //   logger.log('Got articles - article service', response.data.data)
  //   const newArticle = response.data.data.map(articleData => new Article(articleData))
  //   AppState.articles = newArticle.reverse()
  // }
  async getArticleByCode(parkCodes) {
    const responseForTotal = await npsAPI.get(`/articles/?parkcode=${parkCodes}&limit=1`);
    const total = parseInt(responseForTotal.data.total);

    // TODO Pagination
    const page = 1;
    const limit = 10;
    let start = total - (limit * page);
    if (start < 1) {
      start = 0;
    }
    const response = await npsAPI.get(`/articles/?parkcode=${parkCodes}&start=${start}&limit=${limit}`)
    logger.log('Got articles - article service', response.data.data)
    const newArticle = response.data.data.map(articleData => new Article(articleData))
    AppState.articles = newArticle.reverse()
  }

}

export const articlesService = new ArticlesService()