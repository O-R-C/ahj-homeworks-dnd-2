import getElement from '@/js/getElement'
import DropZone from '../DropZone/DropZone'
import ImageGallery from '../ImageGallery/ImageGallery'

import styles from './ImageManager.module.css'

export default class ImageManagerUI {
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
    const app = getElement({ tag: 'div', classes: styles.app })
    const dropZoneContainer = getElement({ tag: 'div', classes: styles.dropZoneContainer })

    const imagesContainer = getElement({ tag: 'div', classes: styles.imagesContainer })

    this.#addDropZone(dropZoneContainer)
    this.#addImageGallery(imagesContainer)

    app.append(dropZoneContainer, imagesContainer)

    return app
  }

  #addDropZone(element) {
    new DropZone(element)
  }

  #addImageGallery(element) {
    new ImageGallery(element)
  }
}
