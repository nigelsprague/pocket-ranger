import { logger } from "@/utils/Logger.js"
import { npsAPI, weatherAPI } from "./AxiosService.js"
import { Park } from "@/models/Park.js"
import { AppState } from "@/AppState.js"
import { pagesService } from "./PagesService.js"

class ParksService {
  async getParkWeather(lat, lon) {
    const response = await weatherAPI.get(`/weather?lat=${lat}&lon=${lon}`)
    logger.log('👺☠️', response.data)
  }
  async changeParksPage(pageNumber, limit) {
    const response = await npsAPI.get(`/parks?start=${limit * (pageNumber - 1)}&limit=${limit}&parkcode=${AppState.parkList}?`)
    logger.log('Changed parks page - parks service', response.data)
    const newParks = response.data.data.map(park => new Park(park))
    AppState.parks = newParks
    pagesService.savePages(response.data, limit)
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
    AppState.parks.sort((a, b) => b.relevanceScore - a.relevanceScore)
    logger.log('👺☠️', AppState.parks)
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
    pagesService.savePages(response.data, limit)
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