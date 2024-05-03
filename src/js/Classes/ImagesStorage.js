import imagesItem from '@/js/Classes/imagesItem'

/**
 * ImagesStorage class.
 * @class
 * @listens dropImage
 */
export default class ImagesStorage {
  #storage = []

  constructor() {
    this.#init()
  }

  #init() {
    this.#addListeners()
  }

  #addListeners() {
    document.addEventListener('dropImage', this.#saveImages)
  }

  #saveImages = (event) => {
    const file = event.detail

    const image = new imagesItem(file)
    this.#storage.push(image)
    console.log('🚀 ~ this.#storage:', this.#storage)
  }
}
