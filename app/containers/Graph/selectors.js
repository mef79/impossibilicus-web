import { createSelector } from 'reselect'

/**
 * Direct selector to the graph state domain
 */
const selectGraphDomain = state => state.get('graph')

const isListening = () => createSelector(
  selectGraphDomain,
  substate => substate.get('isListening')
)

const getSelectedNodeId = () => createSelector(
  selectGraphDomain,
  substate => substate.get('selectedNodeId')
)

const getDimensions = () => createSelector(
  selectGraphDomain,
  substate => substate.get('dimensions')
)

export {
  isListening,
  getSelectedNodeId,
  getDimensions,
}
