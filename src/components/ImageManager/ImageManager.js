import ImageManagerUI from './ImageManagerUI'
import ImagesStorage from '@/js/Classes/ImagesStorage'

export default class ImageManager {
  #imagesStorage = new ImagesStorage('images')
  #ui = new ImageManagerUI()
  #app = this.#ui.app
  #element
  constructor(element) {
    this.#element = this.#ui.getElement(element)
  }

  /**
   * Initializes the component by binding it to the DOM.
   *
   * @return {void} This function does not return a value.
   */
  init() {
    this.#bindToDom()
    this.#addElements()
    this.#addEventListeners()
  }

  #bindToDom() {
    this.#element.append(this.#app)
  }

  #addElements() {}

  #addEventListeners() {
    document.addEventListener('loadImage', this.#onLoadImage)
  }

  #onLoadImage = async (e) => {
    const { detail: image } = e

    try {
      const url = await this.#readImage(image)

      this.#imagesStorage.saveImage({ name: image.name, url })
      this.#fireShowImageEvent(this.#imagesStorage.lastImage)
    } catch (error) {
      console.error('Error adding image:', error)
    }
  }

  #readImage = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result))
      reader.addEventListener('error', reject)

      reader.readAsDataURL(image)
    })
  }

  #getShowImageEvent(image) {
    return new CustomEvent('showImage', {
      detail: image,
    })
  }

  #fireShowImageEvent(image) {
    document.dispatchEvent(this.#getShowImageEvent(image))
  }
}
