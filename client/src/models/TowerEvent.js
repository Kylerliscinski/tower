import { Account } from "./Account.js"



export class TowerEvent{
  constructor(data){
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate)
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creator = data.creator ? new Account(data.creator) : null
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.ticketCount = (data.capacity - data.ticketCount)
    this.attending = data.ticketCount
  }
}