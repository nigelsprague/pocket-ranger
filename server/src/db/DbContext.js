import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ParkSchema } from '../models/Park';
import { FollowerSchema } from '../models/Follower.js';
import { PostSchema } from '../models/Post.js';
import { ReviewSchema } from '../models/Review.js';
import { BookmarksSchema } from '../models/Bookmark.js';
import { ArticleSchema } from '../models/Article.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Parks = mongoose.model('Park', ParkSchema);
  Bookmarks = mongoose.model('Bookmark', BookmarksSchema)
  Articles = mongoose.model('Article', ArticleSchema)
  Followers = mongoose.model('Follower', FollowerSchema);
  Posts = mongoose.model('Post', PostSchema);
  Reviews = mongoose.model('Review', ReviewSchema);
}

export const dbContext = new DbContext()
