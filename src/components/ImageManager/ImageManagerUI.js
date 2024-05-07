import getElement from '@/js/getElement'
import styles from './ImageManager.module.css'
import getDropZone from '../ui/getDropZone/getDropZone'
import imagesContainer from '../imagesContainer/imagesContainer'
import DropZone from '../DropZone/DropZone'

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

    // const imagesContainer = getElement({ tag: 'div', classes: styles.imagesContainer })
    const imagesContainerElement = imagesContainer(styles.imagesContainer)
    // const imagesContainer = getElement({ tag: 'div', classes: styles.imagesContainer, id: 'images-container' })
    // const dropZone = getDropZone(styles.dropZone)

    this.#addDropZone(dropZoneContainer)

    app.append(dropZoneContainer, imagesContainerElement)

    return app
  }

  #addDropZone(element) {
    new DropZone(element, styles.dropZone)
  }
}
