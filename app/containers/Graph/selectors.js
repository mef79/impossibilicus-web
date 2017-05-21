import { createSelector } from 'reselect'

/**
 * Direct selector to the graph state domain
 */
const selectGraphDomain = state => state.get('graph')

const isListening = () => createSelector(
  selectGraphDomain,
  substate => substate.get('isListening'))

const getSelectedNodeId = () => createSelector(
  selectGraphDomain,
  substate => substate.get('selectedNodeId'))

const getSelectedLinkId = () => createSelector(
  selectGraphDomain,
  substate => substate.get('selectedLinkId'))

const getDimensions = () => createSelector(
  selectGraphDomain,
  substate => substate.get('dimensions'))

const getNodeCount = () => createSelector(
  selectGraphDomain,
  substate => substate.get('nodeCounter'))

const getLinkCount = () => createSelector(
  selectGraphDomain,
  substate => substate.get('linkCounter'))

const getLinkingNode = () => createSelector(
  selectGraphDomain,
  substate => substate.get('linkingNode'))

const getMousedownNode = () => createSelector(
  selectGraphDomain,
  substate => substate.get('mousedownNode'))

const getMousedownLink = () => createSelector(
  selectGraphDomain,
  substate => substate.get('mousedownLink'))

const getShouldRedraw = () => createSelector(
  selectGraphDomain,
  substate => substate.get('shouldRedraw'))

export {
  isListening,
  getSelectedNodeId,
  getSelectedLinkId,
  getDimensions,
  getNodeCount,
  getLinkCount,
  getLinkingNode,
  getMousedownNode,
  getMousedownLink,
  getShouldRedraw,
}
