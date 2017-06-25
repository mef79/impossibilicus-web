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

export default makeSelectStipulations
export {
  selectStipulationsDomain,
  getAllStipulations,
}
