import { dbContext } from '../db/DbContext'
import Comment from '../models/Comment'
import { BadRequest } from '../utils/Errors'

class CommentService {
  async getComments(id) {
    const data = await dbContext.Comments.find({ bugId: id }).populate('bug')
    return data
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async delete(id) {
    const commentProfile = await dbContext.Comments.findById(id)
    // @ts-ignore
    await dbContext.Comments.findByIdAndDelete(id)
    if (!Comment) {
      throw new BadRequest('No found Board')
    } return this.getComments()
  }

  async edit(id, body) {
    await dbContext.Comments.findByIdAndUpdate(id, body, { new: true })
    if (!Comment) {
      throw new BadRequest('No found Board')
    } return this.getComments()
  }
}

export const commentService = new CommentService()