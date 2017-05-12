import { createSelector } from 'reselect'

/**
 * Direct selector to the formPane state domain
 */
const selectFormPaneDomain = () => state => state.get('formPane')

/**
 * Other specific selectors
 */


/**
 * Default selector used by FormPane
 */

const makeSelectFormPane = () => createSelector(
  selectFormPaneDomain(),
  substate => substate.toJS()
)
const getFormValues = () => createSelector(
  selectFormPaneDomain(),
  substate => substate.get('formValues')
)

export default makeSelectFormPane
export {
  getFormValues,
  selectFormPaneDomain,

}
