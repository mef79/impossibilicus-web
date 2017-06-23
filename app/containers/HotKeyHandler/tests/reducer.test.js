
import { fromJS } from 'immutable'
import hotKeyHandlerReducer from '../reducer'

describe('hotKeyHandlerReducer', () => {
  it('returns the initial state', () => {
    expect(hotKeyHandlerReducer(undefined, {})).toEqual(fromJS({}))
  })
})
