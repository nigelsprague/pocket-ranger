export class MapMarker {
  constructor(data) {
    this.lat = data.latitude
    this.lng = data.longitude
    this.title = data.fullName || data.title
    this.image = data.images[0].url || data.image
    this.elemId = data.parkCode || data.id
  }
}