import { fromJS } from 'immutable'
import {
  getValid,
  getFile,
  getName,
} from '../selectors'

const file = fromJS({
  type: 'file',
  content: 'content',
  why: 'to have some object data here',
})
const importDialogState = fromJS({
  isValid: true,
  name: 'the name of the file to import',
  file,
})
const mockedState = fromJS({
  importDialog: importDialogState,
})

describe('getValid', () => {
  it('should select valid', () => {
    const getValidSelector = getValid()
    expect(getValidSelector(mockedState)).toEqual(true)
  })
})

describe('getFile', () => {
  it('should select the file', () => {
    const getFileSelector = getFile()
    expect(getFileSelector(mockedState)).toEqual(file)
  })
})

describe('getName', () => {
  it('should select the name', () => {
    const getNameSelector = getName()
    expect(getNameSelector(mockedState)).toEqual('the name of the file to import')
  })
})
