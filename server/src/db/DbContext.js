import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ParkSchema } from '../models/Park';
import { FollowerSchema } from '../models/Follower.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Parks = mongoose.model('Park', ParkSchema);
  Followers = mongoose.model('Follower', FollowerSchema);
}

export const dbContext = new DbContext()
