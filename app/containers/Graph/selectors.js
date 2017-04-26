import { createSelector } from 'reselect'

/**
 * Direct selector to the graph state domain
 */
const selectGraphDomain = () => state => state.get('graph')

const isListening = () => createSelector(
  selectGraphDomain(),
  substate => substate.get('isListening')
)

const getSelectedNode = () => createSelector(
  selectGraphDomain(),
  substate => substate.get('selectedNode')
)

const getDimensions = () => createSelector(
  selectGraphDomain(),
  substate => substate.get('dimensions')
)

export {
  isListening,
  getSelectedNode,
  getDimensions,
}
