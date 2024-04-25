import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class TicketsService{
  async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log("You are now unattending", response.data)
    const indexToRemove = AppState.accountTickets.findIndex(ticket => ticket.id == ticketId)
    Pop.success("You are no longer attending!")
    AppState.accountTickets.splice(indexToRemove, 1)
  }
  async getAccountTicketTowerEvents() {
    const response = await api.get('account/tickets')
    logger.log("Got account tickets", response.data)
    const tickets = response.data.map(ticketData => new Ticket(ticketData))
    AppState.accountTickets = tickets
  }
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