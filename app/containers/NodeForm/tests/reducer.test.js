
import { fromJS } from 'immutable'
import nodeFormReducer from '../reducer'

describe('nodeFormReducer', () => {
  it('returns the initial state', () => {
    expect(nodeFormReducer(undefined, {})).toEqual(fromJS({}))
  })
})
