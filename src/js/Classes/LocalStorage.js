export default class LocalStorage {
  #key

  constructor(key) {
    this.#key = key
  }

  backup(storage) {
    localStorage.setItem(this.#key, JSON.stringify(storage))
  }

  restore() {
    return JSON.parse(localStorage.getItem(this.#key)) || []
  }

  clear() {
    localStorage.removeItem(this.#key)
  }
}
