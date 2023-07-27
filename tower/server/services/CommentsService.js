import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
  async getEventComments(eventId) {
    const eventComments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
    return eventComments
  }
  async createComment(commentData) {
    const newComment = await dbContext.Comments.create(commentData)
    await newComment.populate('creator', 'name picture')
    return newComment
  }
  async removeComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.find({ commentId: commentId })
    if (!commentToDelete) {
      throw new BadRequest('There is no such comment with that ID')
    }
    if (commentToDelete.creatorId.toString() != userId) {
      throw new Forbidden('You cannot delete comment you did not make.')
    }
    await commentToDelete.remove()
  }

}

export const commentsService = new CommentsService()