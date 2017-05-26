
import { fromJS } from 'immutable'
import linkFormReducer from '../reducer'

describe('linkFormReducer', () => {
  it('returns the initial state', () => {
    expect(linkFormReducer(undefined, {})).toEqual(fromJS({}))
  })
})
