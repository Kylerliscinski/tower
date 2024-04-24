import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";




export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .get('/:eventId/tickets', this.getEventTickets)
      .get('/:eventId/comments', this.getEventComments)
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

  async getEventTickets(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketsService.getEventTickets(eventId)
      response.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(request, response, next) {
    try {
      const eventId = request.params.eventId
      const comments = await commentsService.getEventComments(eventId)
      response.send(comments)
    } catch (error) {
      next(error)
    }
  }
}