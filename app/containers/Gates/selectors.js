import { createSelector } from 'reselect'

/**
 * Direct selector to the gates state domain
 */
const selectGatesDomain = () => state => state.get('gates')

/**
 * Other specific selectors
 */

const makeSelectGates = () => createSelector(
  selectGatesDomain(),
  substate => substate.toJS()
)

const listGateTypes = () => createSelector(
  selectGatesDomain(),
  substate => substate.get('gateTypes')
)

const getFilterText = () => createSelector(
  selectGatesDomain(),
  substate => substate.get('filterText')
)

const getFilteredGates = () => createSelector(
  [listGateTypes(), getFilterText()],
  (gates, filterText) => filterText ? gates.toJS().filter(t => t.indexOf(filterText) > -1) : gates.toJS()
)

export default makeSelectGates
export {
  selectGatesDomain,
  listGateTypes,
  getFilterText,
  getFilteredGates,
}
