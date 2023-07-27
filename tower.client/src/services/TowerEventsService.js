import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

  async getTowerEvents() {
    const res = await api.get('api/events')
    logger.log('[GOT TOWER EVENTS]', res.data)
    const towerEvents = res.data.map(d => new TowerEvent(d))
    AppState.towerEvents = towerEvents
  }

  async getTowerEventById(towerEventId) {
    const res = await api.get(`api/events/${towerEventId}`)
    logger.log('[GOT ONE EVENT]', res.data)
    const towerEvent = new TowerEvent(res.data)
    AppState.activeEvent = towerEvent
  }

  async createTowerEvent(towerEventData) {
    const res = await api.post('api/events', towerEventData)
    logger.log(res.data)
    const towerEvent = new TowerEvent(res.data)
    AppState.towerEvents.unshift(towerEvent)
    return towerEvent
  }

  async editTowerEvent(towerEventData) {
    const res = await api.put(`api/events/${towerEventData.id}`, towerEventData)
    // logger.log('[did i edit my event?]', res.data)
    const towerEventIndex = AppState.towerEvents.findIndex(e => e.id == towerEventData.id)
    const updatedEvent = new TowerEvent(res.data)
    AppState.activeEvent = updatedEvent
    AppState.towerEvents.splice(towerEventIndex, 1, updatedEvent)

  }

  async cancelTowerEvent(towerEventId) {
    const res = await api.delete(`api/events/${towerEventId}`)
    // logger.log('[CANCELLED EVENT]', res.data)

  }
}
export const towerEventsService = new TowerEventsService