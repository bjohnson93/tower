import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
  //get my tickets starts in auth service
  async getMyTickets(accountId) {
    const myTickets = await dbContext.Tickets.find({ accountId })
      .populate({
        path: 'event',
        populate: {
          path: 'creator ticketCount'
        },
        //above only comes from event schema
      })
    // .populate('towerEvent')
    // .populate('profile', 'name picture')
    return myTickets
  }
  async getEventTickets(towerEventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId: towerEventId })
      .populate({
        path: 'profile',
        populate: {
          path: 'name picture'
        }
      })
    return eventTickets
  }
  async createTicket(ticketData) {
    const newTicket = await dbContext.Tickets.create(ticketData)
    await newTicket.populate('profile', 'name picture')
    //before, I tried populating the account, but it was in fact the PROFILE that needed populated.
    return newTicket
  }

  async removeTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)
    // const ticketToDelete = await this.getMyTickets({ ticketId })
    if (!ticketToDelete) {
      throw new BadRequest('There is no ticket to delete.')
    }
    if (ticketToDelete.accountId.toString() != userId) {
      throw new Forbidden('You can not delete someone a ticket that does not belong to you')
    }
    await ticketToDelete.remove()

  }
}

export const ticketsService = new TicketsService()