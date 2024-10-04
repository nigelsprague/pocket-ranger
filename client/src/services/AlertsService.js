import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"

class AlertsService {
  async getAlertByCode(parkCode) {
    const response = await npsAPI.get(`/alerts/?parkcode=${parkCode}`)
    logger.log('Got alerts - alert service', response.data.data)
  }

}

export const alertsService = new AlertsService()