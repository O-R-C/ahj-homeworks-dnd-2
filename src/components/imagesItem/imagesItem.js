import getElement from '@/js/getElement'
import styles from './imagesItem.module.css'

/**
 * Creates an image item element with the given image details and a delete button.
 *
 * @fires deleteImage - The deleteImage event is fired when the delete button is clicked.
 * @param {Object} image - The image object containing the image details.
 * @param {string} image.url - The URL of the image.
 * @param {string} image.name - The name of the image.
 * @param {string} image.id - The ID of the image.
 * @return {HTMLElement} The created image item element.
 */
export const imagesItem = (image) => {
  const imagesItem = getElement({ tag: 'div', classes: styles.imagesItem })
  const imageElement = getElement({ tag: 'img', src: image.url, alt: image.name, classes: styles.image })
  const btnDelete = getElement({
    tag: 'button',
    id: image.id,
    classes: styles.btnDelete,
    textContent: 'X',
  })

  imagesItem.append(imageElement, btnDelete)

  imagesItem.addEventListener('click', (event) => {
    if (event.target === btnDelete) {
      imagesItem.remove()

      fireCustomEvent(btnDelete.id)
    }
  })

  return imagesItem
}

/**
 * Creates a new CustomEvent with the name 'deleteImage' and a detail property containing the given ID.
 *
 * @param {string} id - The ID to be included in the event detail.
 * @return {CustomEvent} A new CustomEvent object with the name 'deleteImage' and a detail property containing the given ID.
 */
const getCustomEvent = (id) => {
  return new CustomEvent('deleteImage', {
    detail: id,
  })
}

/**
 * Dispatches a custom event with the given ID.
 *
 *@event deleteImage
 * @param {string} id - The ID of the custom event.
 * @return {void} This function does not return a value.
 */
const fireCustomEvent = (id) => {
  document.dispatchEvent(getCustomEvent(id))
}

export default imagesItem
