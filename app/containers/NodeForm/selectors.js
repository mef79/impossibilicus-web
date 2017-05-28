import { createSelector } from 'reselect'

/**
 * Direct selector to the nodeForm state domain
 */
const selectNodeFormDomain = () => state => state.get('nodeForm')

/**
 * Other specific selectors
 */


/**
 * Default selector used by NodeForm
 */

const makeSelectNodeForm = () => createSelector(
  selectNodeFormDomain(),
  substate => substate.toJS()
)

export default makeSelectNodeForm
export {
  selectNodeFormDomain,
}
