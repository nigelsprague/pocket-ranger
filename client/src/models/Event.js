export class Event {
  constructor(data) {
    this.locationDescription = data.location
    this.parkCode = data.sitecode
    this.title = data.title
    this.HTMLdescription = data.description
    this.isRecurring = data.isrecurring
    this.types = data.types
    this.isFree = data.isfree
    this.isRegResRequired = data.isregresrequired
    this.regResUrl = data.regresurl
    this.regResInfo = data.regresinfo
    //NOTE The image url isn't the full url. You need to add "https://www.nps.gov" to the start of it
    this.images = data.images
    this.category = data.category
    this.times = data.times
    this.dates = data.dates
    this.parkFullName = data.parkfullname
    this.feeInfo = data.feeInfo
    this.isAllDay = data.isallday
    this.infoUrl = data.infourl
  }

  get description() {
    let description = this.HTMLdescription;
    let reg = /<*\w+>|<\/\w+>|\\+n/g
    description = description.replace(reg, "");
    return description;
  }
}