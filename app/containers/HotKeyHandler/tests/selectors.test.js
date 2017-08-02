import { fromJS } from 'immutable'
import {
  getKeyMap,
  getHandlers,
} from '../selectors'

const handlers = fromJS({
  testLog: () => 1
})
const keyMap = fromJS({
  testLog: 'shift + l'
})
const hotkeyHandlerState = fromJS({
  handlers,
  keyMap,
})

const mockedState = fromJS({
  hotKeyHandler: hotkeyHandlerState,
})

describe('getKeyMap', () => {
  it('should select key map', () => {
    const getKeyMapSelector = getKeyMap()
    expect(getKeyMapSelector(mockedState)).toEqual(keyMap)
  })
})

describe('getHandlers', () => {
  it('should select handlers', () => {
    const getHandlersSelector = getHandlers()
    expect(getHandlersSelector(mockedState)).toEqual(handlers)
  })
})
