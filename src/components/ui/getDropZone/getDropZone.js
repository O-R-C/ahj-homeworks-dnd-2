import getElement from '@/js/getElement'
import styles from './getDropZone.module.css'

/**
 * Creates a drop zone element with specific classes and child elements.
 *
 * @fires dropImage - The dropImage event is fired when a file is dropped on the drop zone.
 *
 * @param {string|string[]=} classes - The classes to apply to the drop zone element.
 * @return {HTMLElement} The created drop zone element.
 */
export const getDropZone = (classes) => {
  // Create the drop zone element and append the input file and top element
  const dropZone = getElement({ tag: 'div', classes: [styles.dropZone, classes] })
  const inputFile = getElement({ tag: 'input', type: 'file', accept: 'image/*', hidden: true })
  const topElement = getElement({
    tag: 'div',
    classes: [styles.topElement],
    textContent: 'Drag and Drop files here or Click to select files',
  })
  dropZone.append(inputFile, topElement)

  // Add event listeners for drop, dragend, dragover, dragleave, and click events
  dropZone.addEventListener('drop', onDrop)
  dropZone.addEventListener('dragend', onDragend)
  dropZone.addEventListener('dragover', onDragOver)
  dropZone.addEventListener('dragleave', onDragLeave)
  dropZone.addEventListener('click', () => inputFile.click())

  // Add a change event listener for the input file
  inputFile.addEventListener('change', onInputFileChange)

  // Return the created drop zone element
  return dropZone
}

/**
 * Prevents the default behavior of the onDrop event.
 * Checks if the dropped file is an image and dispatches the dropImage event with the selected file.
 * @event dropImage
 *
 * @param {Event} event - The onDrop event object.
 * @return {void} This function does not return a value.
 */
const onDrop = (event) => {
  event.preventDefault()

  event.currentTarget.classList.remove(styles.drop)

  const file = event.dataTransfer?.files?.[0]

  if (!file || !isImage(file)) {
    showWarning(event.currentTarget)
    return
  }

  fireEvent(file)
}

/**
 * Prevents the default behavior of the onDragOver event.
 *
 * @param {Event} event - The onDragOver event object.
 * @return {void} This function does not return a value.
 */
const onDragOver = (event) => {
  event.preventDefault()
  event.currentTarget.classList.add(styles.drop)
}

/**
 * Removes the 'drop' class from the current target element on drag leave.
 *
 * @param {Event} event - The drag leave event object.
 * @return {void}
 */
const onDragLeave = (event) => {
  event.currentTarget.classList.remove(styles.drop)
}

/**
 * Removes the 'drop' class from the current target element on drag end.
 *
 * @param {Event} event - The dragend event object.
 * @return {void} This function does not return a value.
 */
const onDragend = (event) => {
  event.currentTarget.classList.remove(styles.drop)
}

/**
 * Handles the change event of the input file element.
 * Checks if the selected file is an image and dispatches the dropImage event with the selected file.
 * @event dropImage
 *
 * @param {Event} event - The change event object.
 * @return {void} This function does not return a value.
 */
const onInputFileChange = (event) => {
  const file = event.target.files[0]

  if (!file || !isImage(file)) {
    showWarning(event.currentTarget.closest('[class^="drop-zone"]'))
    return
  }

  fireEvent(file)
}

/**
 * Checks if the given file is an image by verifying if its type starts with 'image/'.
 *
 * @param {File} file - The file object to be checked.
 * @return {boolean} Returns true if the file is an image, false otherwise.
 */
const isImage = (file) => {
  return file.type.startsWith('image/')
}

/**
 * Adds a warning class to the given element and removes it after a 200ms delay.
 *
 * @param {HTMLElement} element - The element to apply the warning class to.
 * @return {void} This function does not return a value.
 */
const showWarning = (element) => {
  element.classList.add(styles.warning)
  setTimeout(() => {
    element.classList.remove(styles.warning)
  }, 200)
}

/**
 * Creates a new CustomEvent with the name 'dropImage' and a detail property containing the given file.
 *
 * @param {File} file - The file object to be included in the event detail.
 * @return {CustomEvent} A new CustomEvent object with the name 'dropImage' and a detail property containing the given file.
 */
const getEventDropImage = (file) => {
  return new CustomEvent('dropImage', { detail: file })
}

/**
 * Dispatches a custom event named 'dropImage' with the given file as the detail.
 *
 * @param {File} file - The file object to be included in the event detail.
 * @return {void} This function does not return a value.
 */
const fireEvent = (file) => {
  document.dispatchEvent(getEventDropImage(file))
}

export default getDropZone
