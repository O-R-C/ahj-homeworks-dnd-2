import setTitle from './setTitle'
import ImageManager from '@/components/ImageManager/ImageManager'

setTitle('Modern Image Manager')

const imageManager = new ImageManager('body')

imageManager.init()
