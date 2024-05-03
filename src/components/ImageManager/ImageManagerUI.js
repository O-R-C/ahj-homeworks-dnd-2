import getElement from '@/js/getElement'
import styles from './ImageManager.module.css'
import getDropZone from '../ui/getDropZone/getDropZone'

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
    const imagesContainer = getElement({ tag: 'div', classes: styles.imagesContainer, id: 'images-container' })
    const dropZone = getDropZone(styles.dropZone)

    app.append(dropZone, imagesContainer)
    return app
  }
}
