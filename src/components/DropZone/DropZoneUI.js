import getElement from '@/js/getElement'
import styles from './DropZone.module.css'

export default class DropZoneUI {
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

  getApp(classes) {
    const app = getElement({ tag: 'div', classes: [styles.dropZone, classes] })
    const inputFile = getElement({ tag: 'input', type: 'file', accept: 'image/*', hidden: true })
    const topElement = getElement({
      tag: 'div',
      classes: [styles.topElement],
      textContent: 'Drag and Drop files here or Click to select files',
    })

    app.append(inputFile, topElement)

    return app
  }

  addDropClass(element) {
    element.classList.add(styles.drop)
  }

  removeDropClass(element) {
    element.classList.remove(styles.drop)
  }

  showWarning(element) {
    element.classList.add(styles.warning)
    setTimeout(() => element.classList.remove(styles.warning), 200)
  }
}
