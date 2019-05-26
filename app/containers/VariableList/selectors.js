import { createSelector } from 'reselect'

/**
 * Direct selector to the variableList state domain
 */
const selectVariableListDomain = state => state.get('variableList')

/**
 * Other specific selectors
 */


/**
 * Default selector used by VariableList
 */

const makeSelectVariableList = () => createSelector(
  selectVariableListDomain,
  (substate) => substate.toJS()
)

export default makeSelectVariableList
export {
  selectVariableListDomain,
}
