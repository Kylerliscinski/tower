import { dbContext } from "../db/DbContext.js"



class TowerEventsService {
  async createTowerEvent(eventData) {
    const towerEvent = await dbContext.TowerEvents.create(eventData)
    await towerEvent.populate('creator')
    return towerEvent
  }

  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator')
    return towerEvents
  }

  async getTowerEventById(eventId) {
    const towerEvent = (await dbContext.TowerEvents.findById(eventId)).populate('creator')
    if (!towerEvent) throw new Error(`No event with the id: ${eventId}`)
    return towerEvent
  }
}

export const towerEventsService = new TowerEventsService()