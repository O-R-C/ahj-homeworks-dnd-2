export default class StorageArray {
  #storage
  #item

  constructor(storage, item) {
    this.#storage = storage
    this.#item = item
  }

  saveItem(item) {
    this.#storage.push(new this.#item(item))
  }

  deleteItemById(id) {
    this.#storage = this.#storage.filter((item) => item.id !== id)
  }
}
