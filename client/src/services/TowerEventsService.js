import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TowerEventsService{
  async getTowerEventById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    logger.log("got event by id", response.data);
    const towerEvent = new TowerEvent(response.data)
    AppState.activeTowerEvent = towerEvent
  }
  async getTowerEvents() {
    const response = await api.get('api/events')
    logger.log('got albums', response.data)
    const towerEvents = response.data.map(eventData => new TowerEvent(eventData))
    AppState.towerEvents = towerEvents
  }

}

export const towerEventsService = new TowerEventsService()