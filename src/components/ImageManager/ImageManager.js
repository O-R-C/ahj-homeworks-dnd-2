import ImageManagerUI from './ImageManagerUI'
import ImagesStorage from '@/js/Classes/ImagesStorage'

/**
 * @classdesc ImageManager class
 */
export default class ImageManager {
  /**
   * @type {ImagesStorage}
   * @private
   */
  #imagesStorage = new ImagesStorage('images')

  /**
   * @type {ImageManagerUI}
   * @private
   */
  #ui = new ImageManagerUI()

  /**
   * @type {HTMLElement}
   * @private
   */
  #app = this.#ui.app

  /**
   * @type {HTMLElement}
   * @private
   */
  #element

  /**
   * @param {string|HTMLElement} element - A string representing a selector or a DOM element
   */
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
    this.#addEventListeners()
  }

  /**
   * @private
   * Binds the component to the DOM.
   * @returns {void}
   */
  #bindToDom() {
    this.#element.append(this.#app)
  }

  /**
   * @private
   * Adds event listeners to the component.
   * @returns {void}
   */
  #addEventListeners() {
    document.addEventListener('loadImage', this.#onLoadImage)
    document.addEventListener('deleteImage', this.#onDeleteImage)
  }

  /**
   * @listens module:ImageManager~ImageManager#event:loadImage
   * @param {Event} e
   * @returns {Promise<void>}
   */
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

  /**
   * @param {File} image
   * @returns {Promise<string>}
   */
  #readImage = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result))
      reader.addEventListener('error', reject)

      reader.readAsDataURL(image)
    })
  }

  /**
   * @param {Object} image
   * @returns {CustomEvent}
   */
  #getShowImageEvent(image) {
    return new CustomEvent('showImage', {
      detail: image,
    })
  }

  /**
   * @fires module:ImageManager~ImageManager#event:showImage
   * @param {Object} image
   */
  #fireShowImageEvent(image) {
    document.dispatchEvent(this.#getShowImageEvent(image))
  }

  /**
   * @listens module:ImageManager~ImageManager#event:deleteImage
   * @param {Event} e
   */
  #onDeleteImage = (e) => {
    this.#imagesStorage.deleteImageById(e.detail)
  }
}
