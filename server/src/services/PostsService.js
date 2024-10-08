import { dbContext } from "../db/DbContext"

class PostsService {
  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    await post.populate('creator')
    await post.populate('park')
    return post
  }

}

export const postsService = new PostsService()