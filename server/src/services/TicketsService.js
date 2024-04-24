import { dbContext } from "../db/DbContext.js"



class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile event')
    return ticket
  }

  async getAccountTickets() {

  }

  async getEventTickets() {

  }
}

export const ticketsService = new TicketsService()