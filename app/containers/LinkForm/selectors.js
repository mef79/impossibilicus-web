import { createSelector } from 'reselect'

/**
 * Direct selector to the linkForm state domain
 */
const selectLinkFormDomain = () => state => state.get('linkForm')

/**
 * Other specific selectors
 */


/**
 * Default selector used by LinkForm
 */

const makeSelectLinkForm = () => createSelector(
  selectLinkFormDomain(),
  (substate) => substate.toJS()
)

export default makeSelectLinkForm
export {
  selectLinkFormDomain,
}
