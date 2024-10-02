import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"

class ParksService {
  async getAllParks() {
    const response = await npsAPI.get('/parks')
    logger.log('Got all parks - parks service', response.data)
  }
}

export const parksService = new ParksService()