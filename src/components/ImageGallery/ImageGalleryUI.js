import getElement from '@/js/getElement'

import styles from './ImageGallery.module.css'
import imageItem from '../ui/imageItem/imageItem'

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

  get app() {
    this.#gallery = getElement({ tag: 'div', classes: styles.imageGallery })

    return this.#gallery
  }

  addImage(image) {
    this.#gallery.append(imageItem(image))
  }

  removeImage(btnDelete) {
    const image = btnDelete.closest('[class^="image-item"]')
    image.remove()
  }
}
