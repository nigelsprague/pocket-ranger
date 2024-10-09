import { Account } from "./Account.js"

export class Review {
  constructor(data) {
    this.id = data.id
    this.recommended = data.recommended
    this.title = data.title
    this.body = data.body
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
    this.parkId = data.parkId
    this.park = data.park
  }
}