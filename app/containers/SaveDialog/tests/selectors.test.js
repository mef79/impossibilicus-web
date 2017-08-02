import { fromJS } from 'immutable'
import {
  getValid,
  getEnteredName,
} from '../selectors'

const saveDialogState = fromJS({
  isValid: true,
  storyName: 'this is a name'
})
const mockedState = fromJS({
  saveDialog: saveDialogState,
})

describe('getValid', () => {
  it('should select valid', () => {
    const getValidSelector = getValid()
    expect(getValidSelector(mockedState)).toEqual(true)
  })
})

describe('getEnteredName', () => {
  it('should select the entered name', () => {
    const getEnteredNameSelector = getEnteredName()
    expect(getEnteredNameSelector(mockedState)).toEqual('this is a name')
  })
})
