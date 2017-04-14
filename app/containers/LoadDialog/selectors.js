import { createSelector } from 'reselect'

/**
 * Direct selector to the loadDialog state domain
 */
const selectLoadDialogDomain = (state) => {
  return state.get('loadDialog')
}

/**
 * Other specific selectors
 */
const makeSelectLoading = () => createSelector(
  selectLoadDialogDomain,
  (substate) => substate.get('loading')
)

const makeSelectError = () => createSelector(
  selectLoadDialogDomain,
  (substate) => substate.get('error')
)

const makeSelectStories = () => createSelector(
  selectLoadDialogDomain,
  (substate) => substate.get('stories')
)

/**
 * Default selector used by LoadDialog
 */

const makeSelectLoadDialog = () => createSelector(
  selectLoadDialogDomain,
  (substate) => substate.toJS()
)

export default makeSelectLoadDialog
export {
  selectLoadDialogDomain,
  makeSelectStories,
  makeSelectError,
  makeSelectLoading
}
