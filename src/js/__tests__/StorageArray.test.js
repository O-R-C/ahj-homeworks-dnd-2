import StorageArray from '../Classes/StorageArray'
import ImagesItem from '../Classes/ImagesItem'

describe('StorageArray', () => {
  let storageArray

  beforeEach(() => {
    storageArray = new StorageArray(ImagesItem)
    storageArray.storage = []
  })

  test('should save item to storage array', () => {
    storageArray.saveItem({ id: '1' })
    expect(storageArray.items).toHaveLength(1)
  })

  test('should delete item from storage array by id', () => {
    storageArray.saveItem({ id: '1' })
    storageArray.deleteItemById('1')
    expect(storageArray.items).toHaveLength(0)
  })

  test('should get items from storage array', () => {
    storageArray.saveItem({ id: '1' })
    storageArray.saveItem({ id: '2' })
    expect(storageArray.items).toHaveLength(2)
  })
})
