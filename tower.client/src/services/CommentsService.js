import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "../models/Comment.js"

class CommentsService {

  async getEventComments(towerEventId) {
    const res = await api.get(`api/events/${towerEventId}/comments`)
    logger.log('This should be the comment from get event comments...', res.data)
    AppState.comments = res.data
    // AppState.comments.push(res.data)

  }
  async createComment(eventCommentData) {
    const res = await api.post('api/comments', eventCommentData)
    logger.log('here is the res.data', res.data)
    const comment = new Comment(res.data)
    logger.log('[Created comment:]', comment)
    AppState.comments = comment
    return comment
  }
  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('now we are in the service to delete comment, here is the res data:', res.data)
    AppState.comments = AppState.comments.filter(comment => comment.id != commentId)
    logger.log('did it delete my comment?', res.data)
  }


  // async deleteMyTicket(ticketId) {
  //   const res = await api.delete(`api/tickets/${ticketId}`)
  //   AppState.myTickets = AppState.myTickets.filter(ticket => ticket.id != ticketId)
  //   AppState.tickets = AppState.tickets.filter(myTicket => myTicket.Id != ticketId)
  //   logger.log('[DID IT DELETE MY TICKET?]', res.data)
  // }

}
export const commentsService = new CommentsService()