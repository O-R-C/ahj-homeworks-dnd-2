import { v4 as uuid } from 'uuid'

export default class imagesItem {
  constructor(image) {
    console.log('🚀 ~ image:', image)
    this.name = image.name
    this.id = uuid()

    this.#getUrl(image)
  }

  #getUrl(image) {
    const reader = new FileReader()

    reader.addEventListener('load', this.#onLoad)

    reader.readAsDataURL(image)
  }

  #onLoad = (event) => {
    this.url = event.target.result
  }
}
