import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";



export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.destroyTicket)
  }

  async createTicket(request, response, next) {
    try {
      const user = request.userInfo
      const ticketData = request.body
      ticketData.accountId = user.id

      const ticket = await ticketsService.createTicket(ticketData)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async destroyTicket(request, response, next) {
    try {
      const ticketId = request.params.ticketId
      const user = request.userInfo
      const message = await ticketsService.destroyTicket(ticketId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}