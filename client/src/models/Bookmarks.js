import { Account } from "./Account.js"

export class Bookmarks {
  constructor(data) {
    this.id = data.id
    this.articleId = data.articleId
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
  }
}