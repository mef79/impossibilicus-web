
import { fromJS } from 'immutable'
import loadDialogReducer from '../reducer'

describe('loadDialogReducer', () => {
  it('returns the initial state', () => {
    expect(loadDialogReducer(undefined, {})).toEqual(fromJS({}))
  })
})
