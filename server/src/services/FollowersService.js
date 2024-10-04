import { dbContext } from "../db/DbContext.js";
import { BadRequest, NotFound } from "../utils/Errors.js";

class FollowersService {

  async getFollowersByCode(parkCode) {
    const followers = await dbContext.Followers.find({ parkCode: parkCode }).populate('creator');
    return followers;
  }

  async createFollower(followerData) {
    const currentFollowers = await this.getFollowersByCode(followerData.parkCode);
    const foundFollowers = currentFollowers.find(follower => follower.creatorId == followerData.creatorId);
    if (foundFollowers) {
      throw new BadRequest('User is already following this park.')
    }
    const follower = await dbContext.Followers.create(followerData);
    await follower.populate('creator');
    return follower;
  }

  async deleteFollower(followerId, userId) {
    const followerToDelete = await dbContext.Followers.findById(followerId)
    if (!followerToDelete) {
      throw new NotFound('No follower found.');
    }
    if (followerToDelete.creatorId != userId) {
      throw new BadRequest(`Can't delete followers of different users.`);
    }

    await followerToDelete.deleteOne();
    return 'Follower deleted.';

  }
}

export const followersService = new FollowersService();