import imagesItem from '@/js/Classes/imagesItem'

/**
 * ImagesStorage class.
 * @class
 * @listens dropImage
 * @fires showImage
 */
export default class ImagesStorage {
  #storage = []
  #currentImageName

  /**
   * Initializes the class by calling the init method.
   *
   * @param {void} This function does not take any parameters.
   * @return {void} This function does not return a value.
   */
  constructor() {
    this.#init()
  }

  /**
   * Initializes the class by adding event listeners.
   *
   * @return {void} This function does not return a value.
   */
  #init() {
    this.#addListeners()
  }

  /**
   * Adds event listeners to the document.
   *
   * @return {void} This function does not return a value.
   */
  #addListeners() {
    document.addEventListener('dropImage', this.#saveImage)
    document.addEventListener('deleteImage', this.#deleteImage)
  }

  /**
   * Saves the image object in the storage array.
   *
   * @fires showImage
   *
   * @param {Event} event - The dropImage event object.
   * @return {void} This function does not return a value.
   */
  #saveImage = (event) => {
    const file = event.detail
    this.#currentImageName = file.name

    this.#getUrl(file)
  }

  #getUrl(image) {
    const reader = new FileReader()

    reader.addEventListener('load', this.#onLoad)

    reader.readAsDataURL(image)
  }

  #onLoad = (event) => {
    const url = event.target.result
    const name = this.#currentImageName
    const image = new imagesItem({ name, url })

    this.#storage.push(image)
    this.#fireEvent(image)
    console.log('🚀 ~ this.#storage:', this.#storage)
  }

  /**
   * Gets a CustomEvent with the given image as the detail.
   *
   * @param {imagesItem} image - The image object to be included in the event detail.
   * @return {CustomEvent} A new CustomEvent object with the name 'showImage' and a detail property containing the given image.
   */
  #getCustomEvent = (image) => {
    return new CustomEvent('showImage', {
      detail: {
        name: image.name,
        url: image.url,
        id: image.id,
      },
    })
  }

  /**
   * Fires a CustomEvent with the given image as the detail.
   *
   * @event showImage
   * @param {imagesItem} image - The image object to be included in the event detail.
   * @return {void} This function does not return a value.
   */
  #fireEvent(image) {
    document.dispatchEvent(this.#getCustomEvent(image))
  }

  #deleteImage = (event) => {
    const id = event.detail
    this.#storage = this.#storage.filter((image) => image.id !== id)
    console.log('🚀 ~ this.#storage:', this.#storage)
  }
}
