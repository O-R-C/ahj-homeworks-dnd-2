import getDropZoneUI from './DropZoneUI'

/**
 * DropZone is a class that represents a drop zone for drag and drop files.
 *
 * @class
 * @fires loadImage
 */
export default class DropZone {
  /**
   * A private instance of DropZoneUI.
   * @private
   */
  #ui = new getDropZoneUI()

  /**
   * The main application element.
   * @type {HTMLElement}
   * @private
   */
  #app = this.#ui.app

  /**
   * The element being initialized as a drop zone.
   * @type {HTMLElement}
   * @private
   */
  #element

  /**
   * The input file element.
   * @type {HTMLInputElement}
   * @private
   */
  #inputFile

  /**
   * Constructs a new DropZone instance.
   *
   * @param {string|HTMLElement} element - The element to be initialized as a drop zone.
   */
  constructor(element) {
    this.#element = this.#ui.getElement(element)

    this.#init()
  }

  /**
   * Initializes the drop zone by binding it to the DOM,
   * adding elements, and adding event listeners.
   * @private
   */
  #init() {
    this.#bindToDom()
    this.#addElements()
    this.#addEventListeners()
  }

  /**
   * Binds the main application element to the specified element.
   * @private
   */
  #bindToDom() {
    this.#element.append(this.#app)
  }

  /**
   * Adds the input file element to the main application element.
   * @private
   */
  #addElements() {
    this.#inputFile = this.#app.querySelector('input[type="file"]')
  }

  /**
   * Adds event listeners to the main application element.
   * @private
   */
  #addEventListeners() {
    this.#app.addEventListener('drop', this.#onDrop)
    this.#app.addEventListener('dragend', this.#onDragend)
    this.#app.addEventListener('dragover', this.#onDragOver)
    this.#app.addEventListener('dragleave', this.#onDragLeave)
    this.#app.addEventListener('click', () => this.#inputFile.click())
    this.#inputFile.addEventListener('change', this.#onInputFileChange)
  }

  /**
   * Handles the 'drop' event.
   * Checks if the dropped file is an image and dispatches the 'loadImage' event with the selected file.
   * @event loadImage
   * @param {Event} e - The event object.
   * @private
   */
  #onDrop = (e) => {
    e.preventDefault()

    const element = e.currentTarget
    const file = e.dataTransfer?.files?.[0]

    this.#ui.removeDropClass(element)

    if (!file || !this.#isImage(file)) {
      this.#ui.showWarning(element)
      return
    }

    this.#fireEventLoadImage(file)
  }

  /**
   * Handles the 'dragover' event.
   * @param {Event} e - The event object.
   * @private
   */
  #onDragOver = (e) => {
    e.preventDefault()
    this.#ui.addDropClass(e.currentTarget)
  }

  /**
   * Handles the 'dragleave' event.
   * @param {Event} e - The event object.
   * @private
   */
  #onDragLeave = (e) => {
    e.preventDefault()
    this.#ui.removeDropClass(e.currentTarget)
  }

  /**
   * Handles the 'dragend' event.
   * @param {Event} e - The event object.
   * @private
   */
  #onDragend = (e) => {
    e.preventDefault()
    this.#ui.removeDropClass(e.currentTarget)
  }

  /**
   * Handles the 'change' event of the input file element.
   * @event loadImage
   * @param {Event} e - The event object.
   * @private
   */
  #onInputFileChange = (e) => {
    const file = e.target.files[0]

    if (!file || !this.#isImage(file)) {
      this.#ui.showWarning(this.#app)
      return
    }

    this.#fireEventLoadImage(file)
  }

  /**
   * Checks if a file is an image.
   * @param {File} file - The file to check.
   * @returns {boolean} True if the file is an image, false otherwise.
   * @private
   */
  #isImage = (file) => {
    return file.type.startsWith('image/')
  }

  /**
   * Returns a new CustomEvent object for the 'loadImage' event.
   * @param {File} file - The file to pass as detail.
   * @returns {CustomEvent} The 'loadImage' event.
   * @private
   */
  #getEventLoadImage = (file) => {
    return new CustomEvent('loadImage', { detail: file })
  }

  /**
   * Fires the 'loadImage' event.
   * @fires loadImage
   * @param {File} file - The file to pass as detail.
   * @private
   */
  #fireEventLoadImage = (file) => {
    document.dispatchEvent(this.#getEventLoadImage(file))
  }
}
