export class Review {
  constructor(data) {
    this.recommended = data.recommended
    this.title = data.title
    this.body = data.body
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.parkId = data.parkId
    this.park = data.park
  }
}