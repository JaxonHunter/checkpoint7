import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'

class CommentService {
  async getComments(bugId) {
    try {
      const res = await api.get('/api/bugs/' + bugId + '/comments')
      AppState.comments[bugId] = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async createComment(commentData) {
    try {
      await api.post('/api/comments', commentData)
      this.getComments(commentData.bugId)
    } catch (err) {
      logger.error(err)
    }
  }

  async editComment(commentId, commentData) {
    try {
      await api.put('/api/comments/' + commentId, commentData)
      this.getComments(commentData.bugId)
    } catch (err) {
      logger.error(err)
    }
  }

  async deleteComment(commentId, commentData) {
    try {
      const bugId = commentData.bugId
      await api.delete('/api/comments/' + commentId)
      this.getComments(bugId)
    } catch (err) {
      logger.error(err)
    }
  }
}
export const commentService = new CommentService()
