import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { Article } from "@/models/Article.js"
import { AppState } from "@/AppState.js"

class ArticlesService {
  async getArticleByFavorites(favoritedParks) {
    const limit = 10
    const response = await npsAPI.get(`/articles/?limit=${limit}&parkcode=${favoritedParks}`)
    logger.log('Got articles - article service', response.data.data)
    const newArticle = response.data.data.map(articleData => new Article(articleData))
    AppState.articles = newArticle
  }
  async getArticleByCode(parkCode) {
    const response = await npsAPI.get(`/articles/?parkcode=${parkCode}`)
    logger.log('Got articles - article service', response.data.data)
    const newArticle = response.data.data.map(articleData => new Article(articleData))
    AppState.articles = newArticle
  }

}

export const articlesService = new ArticlesService()