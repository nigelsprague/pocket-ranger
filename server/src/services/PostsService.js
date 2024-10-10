import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class PostsService {
  async deletePost(postId, userId) {
    const postToDelete = await dbContext.Posts.findById(postId)
    if (!postToDelete) throw Error(`Could not delete, no post with id: ${postId}`)
    if (userId != postToDelete.creatorId) throw new Forbidden('This post is not yours to delete')
    await postToDelete.deleteOne()
    return 'Post deleted'
  }
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