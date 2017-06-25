import { createSelector } from 'reselect'

/**
 * Direct selector to the stipulations state domain
 */
const selectStipulationsDomain = () => state => state.get('stipulations')

/**
 * Other specific selectors
 */


/**
 * Default selector used by Stipulations
 */

const makeSelectStipulations = () => createSelector(
  selectStipulationsDomain(),
  (substate) => substate.toJS()
)

export default makeSelectStipulations
export {
  selectStipulationsDomain,
}
