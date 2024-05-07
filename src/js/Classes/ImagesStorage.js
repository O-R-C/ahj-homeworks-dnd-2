import StorageArray from './StorageArray'
import LocalStorage from './LocalStorage'
import ImagesItem from './ImagesItem'

/**
 * Class representing a storage for images.
 * @extends StorageArray
 */
export default class ImagesStorage extends StorageArray {
  /**
   * The local storage.
   * @type {LocalStorage}
   * @private
   */
  #local

  /**
   * The storage array.
   * @type {Array}
   * @private
   */
  #storage

  /**
   * Constructs a new ImagesStorage.
   *
   * @param {string} key - The key for local storage.
   */
  constructor(key) {
    super(ImagesItem)
    this.#local = new LocalStorage(key)
    this.#storage = this.#local.restore()
  }

  /**
   * Saves an image to the storage.
   *
   * @param {Object} image - The image to save.
   */
  saveImage(image) {
    this.saveItem(image)
    this.#local.backup(this.#storage)
  }

  /**
   * Deletes an image from the storage by id.
   *
   * @param {string} id - The id of the image to delete.
   */
  deleteImageById(id) {
    this.deleteItemById(id)
    this.#local.backup(this.#storage)
  }

  /**
   * Get the images in the storage.
   *
   * @return {Array} The images in the storage.
   */
  get images() {
    return this.items
  }
}
