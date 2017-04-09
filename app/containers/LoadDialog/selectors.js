import { createSelector } from 'reselect'

/**
 * Direct selector to the loadDialog state domain
 */
const selectLoadDialogDomain = () => (state) => {
  return state.get('loadDialog')
}

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoadDialog
 */

const makeSelectLoadDialog = () => createSelector(
  selectLoadDialogDomain(),
  (substate) => substate.toJS()
)

export default makeSelectLoadDialog
export {
  selectLoadDialogDomain
}
