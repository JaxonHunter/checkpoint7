import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'

class BugService {
  async getBugs() {
    try {
      const res = await api.get('/api/bugs')
      AppState.bugs = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async createBug(bugData) {
    try {
      const res = await api.post('/api/bugs', bugData)
      AppState.bugs.push(res.data)
    } catch (err) {
      logger.error(err)
    }
  }

  async getActiveBug(bugId) {
    try {
      const res = await api.get('/api/bugs/' + bugId)
      AppState.activeBug = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async editBug(bugId, bugData) {
    try {
      await api.put('/api/bugs/' + bugId, bugData)
      this.getBugs()
    } catch (err) {
      logger.error(err)
    }
  }
}

export const bugService = new BugService()
