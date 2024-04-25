import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class TicketsService{
  async createTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    logger.log("Ticket created", response.data)
    const ticket = new Ticket(response.data)
    Pop.success("You got a ticket!")
    AppState.activeTowerEventTickets.push(ticket)
  }

}

export const ticketsService = new TicketsService()