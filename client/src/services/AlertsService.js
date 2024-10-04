import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { Alert } from "@/models/Alert.js"
import { AppState } from "@/AppState.js"

class AlertsService {
  async getAlertByCode(parkCode) {
    const response = await npsAPI.get(`/alerts/?parkcode=${parkCode}`)
    logger.log('Got alerts - alert service', response.data.data)
    const newAlert = response.data.data.map(alertData => new Alert(alertData))
    AppState.alerts = newAlert
  }

}

export const alertsService = new AlertsService()