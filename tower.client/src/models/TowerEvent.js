import { Account } from "./Account.js"

export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.isCanceled = data.isCanceled
    this.startDate = new Date(data.startDate)
    this.type = data.type
    this.createdAt = new Date(data.createdAt).toLocaleDateString()
    this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
    this.creator = new Account(data.creator)
    this.ticketCount = data.ticketCount
  }
}

