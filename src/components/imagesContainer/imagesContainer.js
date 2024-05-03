import getElement from '@/js/getElement'
import imagesItem from '../imagesItem/imagesItem'

import styles from './imagesContainer.module.css'

export const imagesContainer = (classes) => {
  const imagesContainer = getElement({ tag: 'div', classes: [styles.imagesContainer, classes] })

  document.addEventListener('showImage', (e) => {
    imagesContainer.append(imagesItem(e.detail))
  })

  return imagesContainer
}

export default imagesContainer
