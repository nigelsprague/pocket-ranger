import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"

class PostsService {
  async getPostsByCommunity(parkCode) {
    const response = await api.get(`api/park/${parkCode}/posts`)
    logger.log(response)
    const newPosts = response.data.map(post => new Post(post))
    AppState.posts = newPosts
  }

}

export const postsService = new PostsService()