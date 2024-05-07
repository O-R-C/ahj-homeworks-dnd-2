import StorageArray from './StorageArray'
import LocalStorage from './LocalStorage'

export default class ImagesStorage {
  #key = 'imagesArray'
  #local = new LocalStorage(this.#key)
  #images = this.#local.restore()
  #storage = new StorageArray(this.#images, ImagesItem)
}
