import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { Park } from "@/models/Park.js"
import { AppState } from "@/AppState.js"

class ParksService {

  //TODO - Figure out how to get limit in the function
  async changeParksPage(pageNumber, limit) {
    const response = await npsAPI.get(`/parks?page=${pageNumber}&limit=${limit}&parkcode=${AppState.parkList}?`)
    logger.log('Changed parks page - parks service', response.data)
  }

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
    // let markers = [];
    // newParks.forEach(park => markers.push(park.latitude + park.longitude));
    // logger.log('👺☠️', markers)
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
    AppState.currentPage = response.data.start = + 1
    AppState.totalPages = Math.ceil(response.data.total / limit)
  }

  async searchAllParks(limit) {
    if (!limit) {
      limit = 472;
    }
    const response = await npsAPI.get(`/parks/?limit=${limit}&parkcode=${AppState.parkList}`)
    logger.log('Got all parks - parks service', response.data)
    const newParks = response.data.data.map(parkData => new Park(parkData))
    AppState.parks = newParks
    // let markers = [];
    // newParks.forEach(park => markers.push({ fullName: park.fullName, parkCode: park.parkCode, lat: park.latitude, lng: park.longitude }));
    // logger.log('👺☠️', markers)
    // AppState.mapMarkers = markers
  }
}

export const parksService = new ParksService()