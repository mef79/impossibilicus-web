
import { fromJS } from 'immutable'
import variableListReducer from '../reducer'

describe('variableListReducer', () => {
  it('returns the initial state', () => {
    expect(variableListReducer(undefined, {})).toEqual(fromJS({}))
  })
})
