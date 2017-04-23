
import { fromJS } from 'immutable'
import saveDialog2Reducer from '../reducer'

describe('saveDialog2Reducer', () => {
  it('returns the initial state', () => {
    expect(saveDialog2Reducer(undefined, {})).toEqual(fromJS({}))
  })
})
