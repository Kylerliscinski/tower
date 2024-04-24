import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile event')
    return ticket
  }


  async getMyEventTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('profile event')
    return tickets
  }

  async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile event')
    return tickets
  }

  async destroyTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)
    if (!ticketToDelete) throw new Error(`no ticket with the id ${ticketId}`)
    if (ticketToDelete.accountId != userId) throw new Forbidden("You can not delete what is not yours")

    await ticketToDelete.populate('profile event')
    await ticketToDelete.deleteOne()
    return ticketToDelete
  }
}

export const ticketsService = new TicketsService()