import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";




export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.editTowerEvent)
      .delete('/:eventId', this.cancelTowerEvent)
  }

  async createTowerEvent(request, response, next) {
    try {
      const user = request.userInfo
      const towerEventData = request.body
      towerEventData.creatorId = user.id
      const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
      response.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEvents(request, response, next) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents()
      response.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const towerEvent = await towerEventsService.getTowerEventById(eventId)
      response.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async editTowerEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const eventData = request.body
      const userInfo = request.userInfo
      eventData.creatorId = userInfo.id

      const editTowerEvent = await towerEventsService.editTowerEvent(eventId, eventData)
      response.send(editTowerEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelTowerEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const message = await towerEventsService.cancelTowerEvent(eventId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}