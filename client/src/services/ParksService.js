import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { Park } from "@/models/Park.js"
import { AppState } from "@/AppState.js"

class ParksService {
  async getParkByCode(parkCode) {
    const response = await npsAPI.get(`/parks/${parkCode}`)
    logger.log('Got park - park service', response.data)
    const newPark = new Park(response.data)
    AppState.activePark = newPark
  }

  async getAllParks() {
    const response = await npsAPI.get('/parks')
    logger.log('Got all parks - parks service', response.data)
    const newParks = response.data.data.map(parkData => new Park(parkData))
    AppState.parks = newParks
  }
}

export const parksService = new ParksService()