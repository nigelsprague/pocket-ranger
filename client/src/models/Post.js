export class Post {
  constructor(data) {
    this.title = data.title
    this.body = data.body
    this.category = data.category
    this.image = data.image
    this.location = data.location
    this.creatorId = data.creatorId
    this.parkCode = data.parkCode
    this.creator = data.creator
    this.park = data.park
  }
}