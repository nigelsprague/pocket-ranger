import { logger } from "@/utils/Logger.js"
import { npsAPI } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { ThingsToDo } from "@/models/ThingsToDo.js"


class ToDoService {
  async getToDoByCode(parkCode) {
    const response = await npsAPI.get(`/thingstodo/?parkcode=${parkCode}`)
    logger.log('Got things to do - todo service', response.data.data)
    const newToDo = response.data.data.map(toDoData => new ThingsToDo(toDoData))
    AppState.thingsToDo = newToDo
  }
}

export const toDoService = new ToDoService()