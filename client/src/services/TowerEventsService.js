import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TowerEventsService{
  async createTowerEvent(eventData) {
    const response = await api.post('api/events', eventData)
    logger.log("Created event", response.data)
    const towerEvent = new TowerEvent(response.data)
    AppState.towerEvents.push(towerEvent)
    return towerEvent
  }
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
  
  async cancelTowerEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    logger.log('cancelled', response.data);
    AppState.activeTowerEvent.isCanceled = true
  }
}

export const towerEventsService = new TowerEventsService()