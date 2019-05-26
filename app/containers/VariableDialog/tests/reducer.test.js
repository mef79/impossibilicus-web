
import { fromJS } from 'immutable'
import variableDialogReducer from '../reducer'

describe('variableDialogReducer', () => {
  it('returns the initial state', () => {
    expect(variableDialogReducer(undefined, {})).toEqual(fromJS({}))
  })
})
