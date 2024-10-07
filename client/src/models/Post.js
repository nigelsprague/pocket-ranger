export class Post {
  constructor(data) {
    this.title = data.title
    this.description = data.description
    this.category = data.category
    this.image = data.image
    this.location = data.location
    this.creatorId = data.creatorId
    this.parkId = data.parkId
    this.creator = data.creator
    this.park = data.park
  }
}