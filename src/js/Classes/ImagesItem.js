import { v4 as uuid } from 'uuid'

/**
 * Represents an item in the images list.
 */
export default class ImagesItem {
  /**
   * Initializes a new ImagesItem instance.
   * @param {Object} image - The image object.
   * @param {string} image.name - The name of the image.
   * @param {string} image.url - The URL of the image.
   * @param {string} [image.id] - The ID of the image. If not provided,
   * a UUID will be generated.
   */
  constructor({ name, url, id = uuid() }) {
    /**
     * The name of the image.
     * @type {string}
     */
    this.name = name

    /**
     * The URL of the image.
     * @type {string}
     */
    this.url = url

    /**
     * The ID of the image.
     * @type {string}
     */
    this.id = id
  }
}
