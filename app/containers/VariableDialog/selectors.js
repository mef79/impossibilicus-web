import { createSelector } from 'reselect'

/**
 * Direct selector to the variableDialog state domain
 */
const selectVariableDialogDomain = state => state.get('variableDialog')

/**
 * Other specific selectors
 */


/**
 * Default selector used by VariableDialog
 */

const makeSelectVariableDialog = () => createSelector(
  selectVariableDialogDomain,
  (substate) => substate.toJS()
)

export default makeSelectVariableDialog
export {
  selectVariableDialogDomain,
}
