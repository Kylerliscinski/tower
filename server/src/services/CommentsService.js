import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }

  async destroyComment(commentId, creatorId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)
    if (!commentToDelete) throw new Error(`no comment with the Id ${commentId}`)
    if (commentToDelete.creatorId != creatorId) throw new Forbidden("You cannot delete a comment that is not yours")

    await commentToDelete.populate('creator')
    await commentToDelete.deleteOne()
    return commentToDelete
  }
}

export const commentsService = new CommentsService()