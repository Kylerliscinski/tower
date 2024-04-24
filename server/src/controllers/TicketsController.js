import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";



export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
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
}