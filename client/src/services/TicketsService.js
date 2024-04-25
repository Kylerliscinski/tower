import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class TicketsService{
  async getTowerEventTickets(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log("got all tickets for this event", response.data)
    const tickets = response.data.map(ticketData => new Ticket(ticketData))
    AppState.activeTowerEventTickets = tickets
  }
  async createTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    logger.log("Ticket created", response.data)
    const ticket = new Ticket(response.data)
    Pop.success("You got a ticket!")
    AppState.activeTowerEventTickets.push(ticket)
    AppState.activeTowerEvent.ticketCount -= 1
  }

}

export const ticketsService = new TicketsService()