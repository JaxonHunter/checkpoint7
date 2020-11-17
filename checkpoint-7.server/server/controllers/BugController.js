import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import BaseController from '../utils/BaseController'
import { commentService } from '../services/CommentService'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:bugId/comment', this.getComment)
      .get('', this.getBugs)
      .post('', this.createBug)
      .put('/:id', this.edit)
      .get('/:bugId', this.getById)
  }

  async getBugs(req, res, next) {
    try {
      const data = await bugService.getBugs(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getComment(req, res, next) {
    try {
      res.send(await commentService.getComments(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.profile = req.userInfo.id
      res.send(await bugService.create(req.body))
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await bugService.edit(req.params.id, req.body))
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await bugService.getById(req.params.bugId))
    } catch (err) {
      next(err)
    }
  }
}
