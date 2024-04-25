import { AppState } from "../AppState.js"
import { TowerComment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class CommentsService{
  async destroyComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log("You deleted that comment", response.data)
    const indexToRemove = AppState.towerComments.findIndex(comment => comment.id == commentId)
    Pop.success("You deleted that comment")
    AppState.towerComments.splice(indexToRemove, 1)
  }
  async createComment(commentData){
    const response = await api.post('api/comments', commentData)
    logger.log("Created a comment", response.data)
    const comment = new TowerComment(response.data)
    AppState.towerComments.unshift(comment)
  }

  async getEventComments(eventId){
    const response = await api.get(`api/events/${eventId}/comments`)
    logger.log("Got this events comments", response.data)
    const comments = response.data.map(commentData => new TowerComment(commentData))
    AppState.towerComments = comments
  }
}

export const commentsService = new CommentsService()