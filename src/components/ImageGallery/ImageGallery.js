import ImageGalleryUI from './ImageGalleryUI'

export default class ImageGallery {
  #ui = new ImageGalleryUI()
  #app = this.#ui.app
  #element

  constructor(element) {
    this.#element = this.#ui.getElement(element)

    this.init()
  }

  init() {
    this.#bindToDom()
    this.#addElements()
    this.#addEventListeners()
  }

  #bindToDom() {
    this.#element.append(this.#app)
  }

  #addElements() {}

  #addEventListeners() {
    document.addEventListener('showImage', this.#onShowImage)
    this.#app.addEventListener('click', this.#onDeleteImage)
  }

  #onShowImage = (e) => {
    const { detail: image } = e

    this.#ui.addImage(image)
  }

  #onDeleteImage = (e) => {
    const btnDelete = e.target.closest('[class^="btn-delete"]')

    if (!btnDelete) return

    this.#ui.removeImage(btnDelete)

    this.#fireDeleteImageEvent(btnDelete.id)
  }

  #getDeleteImageEvent(id) {
    return new CustomEvent('deleteImage', {
      detail: id,
    })
  }

  #fireDeleteImageEvent(id) {
    document.dispatchEvent(this.#getDeleteImageEvent(id))
  }
}
