import getDropZoneUI from './DropZoneUI'

export default class DropZone {
  #ui = new getDropZoneUI()
  #app
  #element
  #inputFile

  constructor(element, classes = '') {
    this.#element = this.#ui.getElement(element)
    this.#app = this.#ui.getApp(classes)

    this.#init()
  }

  #init() {
    this.#bindToDom()
    this.#addElements()
    this.#addEventListeners()
  }

  #bindToDom() {
    this.#element.append(this.#app)
  }

  #addElements() {
    this.#inputFile = this.#app.querySelector('input[type="file"]')
  }

  #addEventListeners() {
    this.#app.addEventListener('drop', this.#onDrop)
    this.#app.addEventListener('dragend', this.#onDragend)
    this.#app.addEventListener('dragover', this.#onDragOver)
    this.#app.addEventListener('dragleave', this.#onDragLeave)
    this.#app.addEventListener('click', () => this.#inputFile.click())
    this.#inputFile.addEventListener('change', this.#onInputFileChange)
  }

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

  #onDragOver = (e) => {
    e.preventDefault()
    this.#ui.addDropClass(e.currentTarget)
  }

  #onDragLeave = (e) => {
    e.preventDefault()
    this.#ui.removeDropClass(e.currentTarget)
  }

  #onDragend = (e) => {
    e.preventDefault()
    this.#ui.removeDropClass(e.currentTarget)
  }

  #onInputFileChange = (e) => {
    const file = e.target.files[0]

    if (!file || !this.#isImage(file)) {
      this.#ui.showWarning(this.#app)
      return
    }

    this.#fireEventLoadImage(file)
  }

  #isImage = (file) => {
    return file.type.startsWith('image/')
  }

  #getEventLoadImage = (file) => {
    return new CustomEvent('loadImage', { detail: file })
  }

  #fireEventLoadImage = (file) => {
    document.dispatchEvent(this.#getEventLoadImage(file))
  }
}
