import ImageGalleryUI from './ImageGalleryUI'

/**
 * @class
 * A class representing the ImageGallery.
 *
 * @listens showImage
 * @fires deleteImage
 */
export default class ImageGallery {
  /**
   * @private
   * The UI instance.
   * @type {ImageGalleryUI}
   */
  #ui = new ImageGalleryUI()

  /**
   * @private
   * The app element.
   * @type {HTMLElement}
   */
  #app = this.#ui.app

  /**
   * @private
   * The element to which the app is bound.
   * @type {HTMLElement}
   */
  #element

  /**
   * @constructor
   * Creates a new ImageGallery instance.
   * @param {string|HTMLElement} element - The element to which the app is bound.
   */
  constructor(element) {
    this.#element = this.#ui.getElement(element)

    this.init()
  }

  /**
   * @private
   * Initializes the ImageGallery instance.
   */
  init() {
    this.#bindToDom()
    this.#addElements()
    this.#addEventListeners()
  }

  /**
   * @private
   * Binds the app to the DOM.
   */
  #bindToDom() {
    this.#element.append(this.#app)
  }

  /**
   * @private
   * Adds elements to the app.
   */
  #addElements() {}

  /**
   * @private
   * Adds event listeners to the app.
   */
  #addEventListeners() {
    document.addEventListener('showImage', this.#onShowImage)
    this.#app.addEventListener('click', this.#onDeleteImage)
  }

  /**
   * @listens showImage
   * @param {Event} e - The showImage event.
   */
  #onShowImage = (e) => {
    const { detail: image } = e

    this.#ui.addImage(image)
  }

  /**
   * @param {MouseEvent} e - The click event.
   * @listens click
   */
  #onDeleteImage = (e) => {
    const btnDelete = e.target.closest('[class^="btn-delete"]')

    if (!btnDelete) return

    this.#ui.removeImage(btnDelete)

    this.#fireDeleteImageEvent(btnDelete.id)
  }

  /**
   * @param {string} id - The ID of the image to delete.
   * @returns {CustomEvent} The deleteImage event.
   * @private
   */
  #getDeleteImageEvent(id) {
    return new CustomEvent('deleteImage', {
      detail: id,
    })
  }

  /**
   * @fires deleteImage
   * @param {string} id - The ID of the image to delete.
   * @private
   */
  #fireDeleteImageEvent(id) {
    document.dispatchEvent(this.#getDeleteImageEvent(id))
  }
}
