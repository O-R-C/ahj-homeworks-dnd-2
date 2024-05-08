import getElement from '@/js/getElement'

import styles from './ImageGallery.module.css'
import imageItem from '../ui/imageItem/imageItem'

/**
 * @class
 * A class representing the ImageGallery UI.
 */
export default class ImageGalleryUI {
  #gallery

  /**
   * Retrieves the element based on the provided parameter.
   *
   * @param {string|HTMLElement} element - The HTML element or a selector string to query the element from the DOM.
   * @return {HTMLElement} The retrieved element.
   */
  getElement(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }
    return element
  }

  /**
   * Retrieves the application element with specific classes and child elements.
   *
   * @return {HTMLElement} The created application element
   */
  get app() {
    this.#gallery = getElement({ tag: 'div', classes: styles.imageGallery })

    return this.#gallery
  }

  /**
   * Adds an image item to the gallery.
   *
   * @param {Object} image - The image object containing the image details.
   * @param {string} image.url - The URL of the image.
   * @param {string} image.name - The name of the image.
   * @param {string} image.id - The ID of the image.
   * @return {void}
   */
  addImage(image) {
    this.#gallery.append(imageItem(image))
  }

  /**
   * Removes the image associated with the given delete button.
   *
   * @param {HTMLElement} btnDelete - The delete button element.
   * @return {void}
   */
  removeImage(btnDelete) {
    const image = btnDelete.closest(`[class^="${styles.imageItem}"]`)
    image.remove()
  }
}
