import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { Park } from "@/models/Park.js"
import { AppState } from "@/AppState.js"

class ParksService {
  async getFavoriteParks(codes) {
    const response = await npsAPI.get(`/parks/?parkcode=${codes}`)
    logger.log(response.data.data)
    const myParks = response.data.data.map(park => new Park(park))
    AppState.favoritedParks = myParks
  }
  clearSearch() {
    AppState.parkQuery = ''
  }
  async searchParks(parkQuery) {
    const response = await npsAPI.get(`/parks/?q=${parkQuery}&parkcode=${AppState.parkList}`)
    AppState.parkQuery = parkQuery
    const newParks = response.data.data.map(park => new Park(park))
    AppState.parks = newParks
  }
  async getParkByCode(parkCode) {
    const response = await npsAPI.get(`/parks/?parkcode=${parkCode}`)
    logger.log('Got park - park service', response.data.data)
    AppState.activePark = new Park(response.data.data[0])
  }

  async getAllParks(limit) {
    if (!limit) {
      limit = 472;
    }
    const response = await npsAPI.get(`/parks/?limit=${limit}&parkcode=${AppState.parkList}`)
    logger.log('Got all parks - parks service', response.data)
    const newParks = response.data.data.map(parkData => new Park(parkData))
    AppState.parks = newParks
  }
}

export const parksService = new ParksService()