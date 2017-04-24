import { createSelector } from 'reselect'

/**
 * Direct selector to the graph state domain
 */
const selectGraphDomain = () => state => state.get('graph')

const isListening = () => createSelector(
  selectGraphDomain(),
  substate => substate.get('isListening')
)

export {
  isListening,
}
