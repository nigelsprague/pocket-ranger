
export class ThingsToDo {
  constructor(data) {
    this.id = data.id
    this.relatedParks = data.relatedParks
    this.location = data.location
    this.isReservationRequired = data.isReservationRequired
    this.petsDescription = data.petsDescription
    this.images = data.images
    this.accessibilityInformation = data.accessibilityInformation
    this.url = data.url
    this.longDescription = data.longDescription
    this.season = data.season
    this.shortDescription = data.shortDescription
    this.title = data.title
  }
}