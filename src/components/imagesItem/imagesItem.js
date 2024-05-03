import getElement from '@/js/getElement'
import styles from './imagesItem.module.css'

export const imagesItem = (image) => {
  const imagesItem = getElement({ tag: 'div', classes: styles.imagesItem })
  const imageElement = getElement({ tag: 'img', src: image.url, alt: image.name, classes: styles.image })
  const btnDelete = getElement({
    tag: 'button',
    classes: styles.btnDelete,
    textContent: 'X',
  })

  imagesItem.append(imageElement, btnDelete)

  imagesItem.addEventListener('click', (event) => {
    if (event.target === btnDelete) {
      imagesItem.remove()
    }
  })

  return imagesItem
}

export default imagesItem
