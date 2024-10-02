import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ParkSchema } from '../models/Park';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Parks = mongoose.model('Park', ParkSchema);
}

export const dbContext = new DbContext()
