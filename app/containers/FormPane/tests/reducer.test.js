
import { fromJS } from 'immutable'
import formPaneReducer from '../reducer'

describe('formPaneReducer', () => {
  it('returns the initial state', () => {
    expect(formPaneReducer(undefined, {})).toEqual(fromJS({}))
  })
})
