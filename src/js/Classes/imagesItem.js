import { v4 as uuid } from 'uuid'

export default class imagesItem {
  constructor(image) {
    this.name = image.name
    this.url = image.url
    this.id = uuid()
  }
}
