import { createSelector } from 'reselect'

/**
 * Direct selector to the formPane state domain
 */
const selectFormPaneDomain = state => state.get('formPane')

const getFormValues = () => createSelector(
  selectFormPaneDomain,
  substate => substate.get('formValues')
)

export {
  getFormValues,
}
