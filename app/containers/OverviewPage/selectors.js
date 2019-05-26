import { createSelector } from 'reselect'

/**
 * Direct selector to the overviewPage state domain
 */
const selectOverviewPageDomain = state => state.get('overviewPage')

const getVariables = () => createSelector(
  selectOverviewPageDomain,
  substate => substate.get('variables'),
)

export {
  getVariables,
}
