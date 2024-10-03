export class Park {
  constructor(data) {
    this.id = data.id
    this.address = data.addresses[0]
    this.fullName = data.fullName
    this.description = data.description
    this.images = data.images
    this.parkCode = data.parkCode
    this.entranceFees = data.entranceFees
    this.operatingHours = data.operatingHours
    this.weather = data.weather
    this.states = data.states
    this.designation = data.designation
    this.contacts = data.contacts
    this.activities = data.activities
    this.latLong = data.latLong
  }
}