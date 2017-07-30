
import { fromJS } from 'immutable'
import stipulationsReducer from '../reducer'

describe('stipulationsReducer', () => {
  it('returns the initial state', () => {
    expect(stipulationsReducer(undefined, {})).toEqual(fromJS({}))
  })
})
