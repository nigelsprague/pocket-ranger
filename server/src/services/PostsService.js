import { dbContext } from "../db/DbContext"

class PostsService {
  async getPostsByCode(parkCode) {
    const posts = await dbContext.Posts.find({ parkCode: parkCode }).populate('creator park')
    return posts
  }
  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    await post.populate('creator')
    await post.populate('park')
    return post
  }

}

export const postsService = new PostsService()