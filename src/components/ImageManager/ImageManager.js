import ImageManagerUI from './ImageManagerUI'
import ImagesStorage from '@/js/Classes/ImagesStorage'

export default class ImageManager {
  #ui = new ImageManagerUI()
  #imagesStorage = new ImagesStorage('images')
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
    document.addEventListener('loadImage', (e) => {
      const file = e.detail
      this.#imagesStorage.saveImage(file)
      console.log('🚀 ~ this.#imagesStorage:', this.#imagesStorage.images)
    })
  }
}
