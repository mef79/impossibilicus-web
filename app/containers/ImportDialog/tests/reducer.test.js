
import { fromJS } from 'immutable'
import importDialogReducer from '../reducer'

describe('importDialogReducer', () => {
  it('returns the initial state', () => {
    expect(importDialogReducer(undefined, {})).toEqual(fromJS({}))
  })
})
