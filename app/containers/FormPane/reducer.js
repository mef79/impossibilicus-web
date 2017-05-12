/*
 *
 * FormPane reducer
 *
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  UPDATE_FORM_VALUES
} from './constants'

const initialState = fromJS({
  formValues: {
    title: 'Default Title',
    content: 'Default Content',
  },
})

function formPaneReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case UPDATE_FORM_VALUES:
      return state
        .set('formValues', fromJS(action.values))
    default:
      return state
  }
}

export default formPaneReducer
