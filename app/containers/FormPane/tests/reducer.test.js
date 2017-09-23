import { fromJS } from 'immutable'
import formPaneReducer from '../reducer'
import {
  updateFormValues,
} from '../actions'

describe('formPaneReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      formValues: {
        title: 'Default Title',
        content: 'Default Content',
      },
    })
  })
  it('returns the initial state', () => {
    expect(formPaneReducer(undefined, {})).toEqual(state)
  })
  it('should handle the updateFormValues action correctly', () => {
    const newValues = { title: 'New title', content: 'New content' }
    const expectedResult = state.set('formValues', fromJS(newValues))
    expect(formPaneReducer(state, updateFormValues(newValues))).toEqual(expectedResult)
  })
})
