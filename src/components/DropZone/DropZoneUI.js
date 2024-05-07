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

  /**
   * Retrieves the application element with specific classes and child elements.
   *
   * @param {string|string[]} classes - description of classes parameter
   * @return {HTMLElement} The created application element
   */
  get app() {
    const app = getElement({ tag: 'div', classes: styles.dropZone })
    const inputFile = getElement({ tag: 'input', type: 'file', accept: 'image/*', hidden: true })
    const topElement = getElement({
      tag: 'div',
      classes: [styles.topElement],
      textContent: 'Drag and Drop files here or Click to select files',
    })

    app.append(inputFile, topElement)

    return app
  }

  /**
   * Adds the 'drop' class to the specified element.
   *
   * @param {HTMLElement} element - The element to add the 'drop' class to.
   * @return {void} This function does not return a value.
   */
  addDropClass(element) {
    element.classList.add(styles.drop)
  }

  /**
   * Removes the 'drop' class from the given element.
   *
   * @param {HTMLElement} element - The element from which to remove the 'drop' class.
   * @return {void} This function does not return a value.
   */
  removeDropClass(element) {
    element.classList.remove(styles.drop)
  }

  /**
   * Adds a warning class to the given element and removes it after a 200ms delay.
   *
   * @param {HTMLElement} element - The element to apply the warning class to.
   * @return {void} This function does not return a value.
   */
  showWarning(element) {
    element.classList.add(styles.warning)
    setTimeout(() => element.classList.remove(styles.warning), 200)
  }
}
