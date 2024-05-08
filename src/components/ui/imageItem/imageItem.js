import getElement from '@/js/getElement'
import styles from './imageItem.module.css'

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
export const imageItem = (image) => {
  const imagesItem = getElement({ tag: 'div', classes: styles.imageItem })
  const imageElement = getElement({ tag: 'img', src: image.url, alt: image.name, classes: styles.image })
  const btnDelete = getElement({
    tag: 'button',
    id: image.id,
    classes: styles.btnDelete,
    textContent: 'X',
  })

  imagesItem.append(imageElement, btnDelete)

  return imagesItem
}

export default imageItem
