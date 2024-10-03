import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Park } from "@/models/Park.js"


class ToDoService{
  async getToDoByCode(parkCode) {
    const response = await npsAPI.get(`/thingstodo/?parkcode=${parkCode}`)
    logger.log('Got things to do - todo service', response.data.data)
  }
}

export const toDoService = new ToDoService()