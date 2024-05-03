import ImageManagerUI from './ImageManagerUI'

export default class ImageManager {
  #ui = new ImageManagerUI()
  #app = this.#ui.app
  #element
  constructor(element) {
    this.#element = this.#ui.getElement(element)
  }

  /**
   * Initializes the component by binding it to the DOM.
   *
   * @return {void} This function does not return a value.
   */
  init() {
    this.#bindToDom()
  }

  #bindToDom() {
    this.#element.append(this.#app)
  }
}
