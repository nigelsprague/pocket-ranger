import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Follower } from "@/models/Follower.js";

class FollowersService {


  async getFollowersByCode(parkCode) {
    const response = await api.get(`api/park/${parkCode}/followers`);
    AppState.followers = response.data.map(follower => new Follower(follower));
  }

  async createFollower(parkCode) {
    const payload = {parkCode: parkCode};
    const response = await api.post('api/followers', payload);
    AppState.followers.push(new Follower(response.data));
  }

  async deleteFollower(followerId) {
    const response = await api.delete(`api/followers/${followerId}`);
    const indexToDelete = AppState.followers.findIndex(follower => follower.id == followerId);
    AppState.followers.splice(indexToDelete, 1)
    return response.data;
  }
}

export const followersService = new FollowersService();