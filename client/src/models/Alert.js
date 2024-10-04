export class Alert {
  constructor(data) {
    this.id = data.id
    this.category = data.category
    this.body = data.description
    this.parkCode = data.parkCode
    this.title = data.title
    this.url = data.url
    this.lastIndexedDate = new Date(data.lastIndexedDate)
  }
}

const data =    {
  "category": "Information",
  "description": "Some destinations are unavailable because of construction related to the Canyon Overlooks and Trails Restoration Project.",
  "id": "4C3095E2-1DD8-B71B-0BAC8E16AABF3113",
  "parkCode": "yell",
  "title": "Area Closures in Canyon",
  "url": "https://www.nps.gov/yell/planyourvisit/canyonprojects.htm",
  "lastIndexedDate": "2023-06-27 14:10:21.0",
  "relatedRoadEvents": []
}