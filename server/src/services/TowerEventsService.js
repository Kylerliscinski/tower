import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class TowerEventsService {
  async createTowerEvent(eventData) {
    const towerEvent = await dbContext.TowerEvents.create(eventData)
    await towerEvent.populate('creator')
    await towerEvent.populate('ticketCount')
    return towerEvent
  }

  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator ticketCount')
    return towerEvents
  }

  async getTowerEventById(eventId) {
    const towerEvent = (await dbContext.TowerEvents.findById(eventId)).populate('creator ticketCount')
    if (!towerEvent) throw new Error(`No event with the id: ${eventId}`)
    return towerEvent
  }

  async editTowerEvent(eventId, eventData) {
    const towerEventToEdit = await this.getTowerEventById(eventId)

    if (towerEventToEdit.creatorId != eventData.creatorId) throw new Forbidden('Cannot edit someone elses event!')

    towerEventToEdit.name = eventData.name ?? towerEventToEdit.name
    towerEventToEdit.description = eventData.description ?? towerEventToEdit.description
    // towerEventToEdit.coverImg = eventData.coverImg ?? towerEventToEdit.coverImg
    // towerEventToEdit.location = eventData.location ?? towerEventToEdit.location
    // towerEventToEdit.capacity = eventData.capacity ?? towerEventToEdit.capacity
    // towerEventToEdit.startDate = eventData.startDate ?? towerEventToEdit.startDate
    // towerEventToEdit.isCanceled = eventData.isCanceled ?? towerEventToEdit.isCanceled
    // towerEventToEdit.type = eventData.type ?? towerEventToEdit.type

    await towerEventToEdit.save()
    return towerEventToEdit
  }

  async cancelTowerEvent(eventId, userId) {
    const towerEventToCancel = await this.getTowerEventById(eventId)

    if (towerEventToCancel.creatorId != userId) throw new Forbidden('You cannot cancel someone elses event!')

    towerEventToCancel.isCanceled = !towerEventToCancel.isCanceled
    await towerEventToCancel.save()
    return `${towerEventToCancel.name} has been canceled`
  }
}

export const towerEventsService = new TowerEventsService()