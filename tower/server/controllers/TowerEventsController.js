import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      //routes
      .get('', this.getTowerEvents)
      .get('/:towerEventId', this.getTowerEventById)
      .get('/:towerEventId/tickets', this.getEventTickets)
      .get('/:eventId/comments', this.getEventComments)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:towerEventId', this.updateTowerEvent)
      .delete('/:towerEventId', this.cancelTowerEvent)
  }

  async getTowerEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents()
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async getTowerEventById(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const towerEvent = await towerEventsService.getTowerEventById(towerEventId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async getEventTickets(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const eventTickets = await ticketsService.getEventTickets(towerEventId)
      return res.send(eventTickets)
    } catch (error) {
      next(error)
    }
  }
  async getEventComments(req, res, next) {
    try {
      const eventId = req.params.eventId
      const eventComments = await commentsService.getEventComments(eventId)
      return res.send(eventComments)
    } catch (error) {
      next(error)
    }
  }
  async createTowerEvent(req, res, next) {
    try {
      const towerEventData = req.body
      towerEventData.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async updateTowerEvent(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const userId = req.userInfo.id
      const towerEventData = req.body
      const towerEvent = await towerEventsService.updateTowerEvent(towerEventId, userId, towerEventData)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async cancelTowerEvent(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const userId = req.userInfo.id
      const towerEvent = await towerEventsService.cancelTowerEvent(towerEventId, userId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
}