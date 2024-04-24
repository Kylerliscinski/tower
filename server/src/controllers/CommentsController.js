import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";



export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.destroyComment)
  }

  async createComment(request, response, next) {
    try {
      const user = request.userInfo
      const commentData = request.body
      commentData.creatorId = user.id
      const comment = await commentsService.createComment(commentData)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async destroyComment(request, response, next) {
    try {
      const commentId = request.params.commentId
      const user = request.userInfo
      const message = await commentsService.destroyComment(commentId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}