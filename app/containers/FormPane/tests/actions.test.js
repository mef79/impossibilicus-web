
import {
  updateSelectedNode,
  updateFormValues,
} from '../actions'
import {
  UPDATE_SELECTED_NODE,
  UPDATE_FORM_VALUES,
} from '../constants'

describe('FormPane actions', () => {
  describe('UPDATE_SELECTED_NODE', () => {
    it('has a type of UPDATE_SELECTED_NODE', () => {
      const expected = {
        type: UPDATE_SELECTED_NODE
      }
      expect(updateSelectedNode()).toEqual(expected)
    })
  })
  describe('UPDATE_FORM_VALUES', () => {
    it('has a type of UPDATE_FORM_VALUES', () => {
      const expected = {
        type: UPDATE_FORM_VALUES
      }
      expect(updateFormValues()).toEqual(expected)
    })
  })
})
