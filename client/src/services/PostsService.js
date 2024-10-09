import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getPostsByCommunity(parkCode) {
    const response = await api.get(`api/park/${parkCode}/posts`)
    logger.log(response)
  }

}

export const postsService = new PostsService()