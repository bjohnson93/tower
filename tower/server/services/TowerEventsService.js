import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {

  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find()
      .populate('creator', 'name picture')
      .populate('ticketCount')
    return towerEvents
  }
  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator ticketCount', 'name picture')
    if (!towerEvent) {
      throw new BadRequest(`Event with the id of ${towerEventId} not found.`)
    }
    return towerEvent
  }
  async createTowerEvent(towerEventData) {
    const newTowerEvent = await dbContext.TowerEvents.create(towerEventData)
    await newTowerEvent.populate('creator ticketCount', 'name picture')

    return newTowerEvent
  }
  async updateTowerEvent(towerEventId, userId, towerEventData) {
    const originalEvent = await this.getTowerEventById(towerEventId)

    if (originalEvent.creatorId.toString() != userId) {
      throw new Forbidden('You did not create this event!')
    }
    originalEvent.name = towerEventData || originalEvent.name
    originalEvent.description = towerEventData || originalEvent.description
    originalEvent.coverImg = towerEventData || originalEvent.coverImg
    originalEvent.location = towerEventData || originalEvent.location
    originalEvent.capacity = towerEventData || originalEvent.capacity
    originalEvent.startDate = towerEventData || originalEvent.startDate
    originalEvent.isCanceled = towerEventData || originalEvent.isCanceled
    originalEvent.type = towerEventData || originalEvent.type

    await originalEvent.save()

    return originalEvent
  }
}

export const towerEventsService = new TowerEventsService()