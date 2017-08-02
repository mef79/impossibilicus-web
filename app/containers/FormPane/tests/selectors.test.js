import { fromJS } from 'immutable'
import { getFormValues } from '../selectors'


const formValues = fromJS({
  title: 'Default Title',
  content: 'Default Content',
})

const formPaneState = fromJS({
  formValues
})

const mockedState = fromJS({
  formPane: formPaneState,
})

describe('getFormValues', () => {
  it('should select form values', () => {
    const getFormValuesSelector = getFormValues()
    expect(getFormValuesSelector(mockedState)).toEqual(formValues)
  })
})
