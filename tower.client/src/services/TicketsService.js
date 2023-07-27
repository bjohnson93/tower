import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService {

  async buyTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    logger.log('[GETTING A TICKET]', res.data)
    AppState.tickets.push(new Ticket(res.data))
  }
  async getMyTickets() {
    try {
      const res = await api.get('account/tickets')
      logger.log('[DID I GET MY TICKETS?', res.data)
      AppState.myTickets = res.data.map(d => new Ticket(d))
      logger.log('[MY TICKETS FROM THE APPSTATE?]', AppState.myTickets)
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }
  async deleteMyTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    AppState.myTickets = AppState.myTickets.filter(ticket => ticket.id != ticketId)
    AppState.tickets = AppState.tickets.filter(myTicket => myTicket.Id != ticketId)
    logger.log('[DID IT DELETE MY TICKET?]', res.data)
  }
}

export const ticketsService = new TicketsService()