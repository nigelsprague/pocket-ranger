export class ArticleImage {
  constructor(data) {
    this.url = data.url
    this.credit = data.credit
    this.altText = data.altText
    this.title = data.title
    this.description = data.description
    this.caption = data.caption
  }
}
export class Article {
  constructor(data) {
    this.id = data.id
    this.url = data.url
    this.title = data.title
    this.body = data.listingDescription
    this.listingImage = new ArticleImage(data.listingImage) //NOTE - intelisense for objects
  }
}


const data = {
  "url": "https://www.nps.gov/articles/lafayette-square-preservation.htm",
  "title": "The “First Neighborhood”: Presidents and Preservation in Lafayette Park",
  "id": "FB939FC8-04B4-42F7-BC97-5557890D33F8",
  "geometryPoiId": "8793be28-0d54-493f-8556-877e7ecbe937",
  "listingDescription": "Presidents from Franklin D. Roosevelt to Lyndon B. Johnson, as well as two first ladies, were instrumental in preserving the 19th century historic character of Lafayette Square. Their advocacy influenced not only the White House's closest national historic district, but the development of national historic preservation law.",
  "listingImage": {
    "url": "https://www.nps.gov/common/uploads/articles/images/nri/20170118/articles/F6AD3834-1DD8-B71B-0BA8516D0F8C4D85/F6AD3834-1DD8-B71B-0BA8516D0F8C4D85.jpg",
    "credit": "",
    "altText": "Historic town homes in front of modern brick building",
    "title": "",
    "description": "",
    "caption": ""
  },
}