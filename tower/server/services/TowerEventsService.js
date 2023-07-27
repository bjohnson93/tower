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

    if (originalEvent.isCanceled) {
      throw new BadRequest('You can not edit an already cancelled event')
    }
    originalEvent.name = towerEventData.name || originalEvent.name
    originalEvent.description = towerEventData.description || originalEvent.description
    originalEvent.coverImg = towerEventData.coverImg || originalEvent.coverImg
    originalEvent.location = towerEventData.location || originalEvent.location
    // originalEvent.capacity = towerEventData || originalEvent.capacity
    originalEvent.startDate = towerEventData.startDate || originalEvent.startDate
    originalEvent.type = towerEventData.type || originalEvent.type

    let updatedEvent = await originalEvent.save()

    return updatedEvent
  }

  async cancelTowerEvent(towerEventId, userId) {
    const eventToCancel = await this.getTowerEventById(towerEventId)

    if (eventToCancel.creatorId.toString() != userId) {
      throw new Forbidden(`You are not the creator of ${eventToCancel.name}, you can't cancel this event!`)
    }
    if (eventToCancel.isCanceled) {
      throw new BadRequest(`${eventToCancel.name} has already been cancelled, you can not cancel again.`)
    }
    eventToCancel.isCanceled = true
    await eventToCancel.save()
    return eventToCancel
  }
}

export const towerEventsService = new TowerEventsService()