import getElement from '@/js/getElement'
import styles from './imagesContainer.module.css'

export const imagesContainer = (classes) => {
  const imagesContainer = getElement({ tag: 'div', classes: [styles.imagesContainer, classes] })

  return imagesContainer
}

const onDropImage = (event) => {
  event.preventDefault()
}

export default imagesContainer
