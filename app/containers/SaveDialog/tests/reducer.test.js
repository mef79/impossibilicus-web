
import { fromJS } from 'immutable'
import saveDialog2Reducer from '../reducer'

const initialState = fromJS({
  isValid: true
})

describe('saveDialog2Reducer', () => {
  it('returns the initial state', () => {
    expect(saveDialog2Reducer(undefined, {})).toEqual(initialState)
  })
})
