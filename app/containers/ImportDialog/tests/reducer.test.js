
import { fromJS } from 'immutable'
import importDialogReducer from '../reducer'

describe('importDialogReducer', () => {
  const initialState = fromJS({
    isValid: true,
  })
  it('returns the initial state', () => {
    expect(importDialogReducer(undefined, {})).toEqual(initialState)
  })
})
