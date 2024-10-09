import { AppState } from "@/AppState.js"
import { Account } from "./Account.js"

export class Post {
  /**@type {Account} */
  creator
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.body = data.body
    this.category = data.category
    this.image = data.image
    this.location = data.location
    this.parkCode = data.parkCode
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = new Account(data.creator || AppState.account || {})
    this.park = data.park
  }

  get postDate() {
    const postDate = new Date(this.createdAt).toLocaleDateString()
    return postDate
  }
}