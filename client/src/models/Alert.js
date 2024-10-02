export class Alert {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.body = data.body
    this.category = data.category
    this.parkCode = data.parkCode
    this.url = data.url
    this.lastIndexedDate = new Date(data.lastIndexedDate)
  }
}