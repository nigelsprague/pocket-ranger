import { dbContext } from "../db/DbContext.js";

class FollowersService {


  async createFollower(data) {
    const follower = await dbContext.Followers.create(data);
    await follower.populate('creator');
    await follower.populate('park');
    return follower;
  }
}

export const followersService = new FollowersService();