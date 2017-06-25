import { createSelector } from 'reselect'

/**
 * Direct selector to the stipulations state domain
 */
const selectStipulationsDomain = () => state => state.get('stipulations')

/**
 * Other specific selectors
 */

const makeSelectStipulations = () => createSelector(
  selectStipulationsDomain(),
  substate => substate.toJS()
)

const getAllStipulations = () => createSelector(
  selectStipulationsDomain(),
  substate => substate.get('stipulations')
)

const getFilterText = () => createSelector(
  selectStipulationsDomain(),
  substate => substate.get('filterText')
)

const getFilteredStipulations = () => createSelector(
  [getAllStipulations(), getFilterText()],
  (stipulations, filterText) => filterText ? stipulations.toJS().filter(t => t.indexOf(filterText) > -1) : stipulations.toJS()
)

export default makeSelectStipulations
export {
  selectStipulationsDomain,
  getAllStipulations,
  getFilterText,
  getFilteredStipulations,
}
