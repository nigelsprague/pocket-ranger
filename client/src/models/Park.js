export class Fee {
  constructor(data) {
    this.id = data.id
    this.cost = data.cost
    this.title = data.title
    this.description = data.description
  }
}

export class Park {
  constructor(data) {
    this.id = data.id
    this.address = data.addresses[0]
    this.fullName = data.fullName
    this.description = data.description
    this.images = data.images
    this.parkCode = data.parkCode
    this.entranceFees = data.entranceFees.map(fee => new Fee(fee)) //NOTE - intelisense for an array of objects
    this.operatingHours = data.operatingHours
    this.weather = data.weather
    this.states = data.states
    this.designation = data.designation
    this.contacts = data.contacts
    this.activities = data.activities
    this.latitude = data.latitude
    this.longitude = data.longitude
  }
}