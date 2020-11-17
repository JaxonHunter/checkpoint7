import { dbContext } from '../db/DbContext'
import Bug from '../models/Bug'
import { BadRequest } from '../utils/Errors'

class BugService {
  async getBugs(query = {}) {
    return await dbContext.Bugs.find(query)
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async delete(id, userId) {
    const bugProfile = await dbContext.Bugs.findById(id)
    // @ts-ignore
    if (userId === bugProfile.profile) {
      await dbContext.Bugs.findByIdAndDelete(id)
      if (!Bug) {
        throw new BadRequest('No found Bug')
      } return this.getBugs()
    } throw new BadRequest('Access Denied')
  }

  async edit(id, body) {
    await dbContext.Bugs.findByIdAndUpdate(id, body, { new: true })
    if (!Bug) {
      throw new BadRequest('No found Bug')
    } return this.getBugs()
  }

  async getById(id) {
    return await dbContext.Bugs.findById(id)
  }
}

export const bugService = new BugService()