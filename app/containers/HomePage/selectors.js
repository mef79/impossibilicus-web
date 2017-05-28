/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectHome = state => state.get('home')

// todo: figure out how to get this from an import from graph
const selectCurrentNodeId = state => state.get('graph').get('selectedNodeId')
const selectCurrentLinkId = state => state.get('graph').get('selectedLinkId')

const getLoadDialogVisibility = () => createSelector(
  selectHome,
  homeState => homeState.get('isLoadDialogVisible')
)

const getSaveDialogVisibility = () => createSelector(
  selectHome,
  homeState => homeState.get('isSaveDialogVisible')
)

const getCurrentStory = () => createSelector(
  selectHome,
  homeState => homeState.get('currentStory'))

const getLoadedStoryData = () => createSelector(
  selectHome,
  homeState => homeState.get('loadedStory'))

const getContentItem = () => createSelector(
  selectHome,
  homeState => homeState.get('contentItem'))

const getCurrentData = () => createSelector(
  selectHome,
  homeState => homeState.get('currentData'))

const getCurrentName = () => createSelector(
  selectHome,
  homeState => homeState.get('currentData').get('name'))

const getLastSavedData = () => createSelector(
  selectHome,
  homeState => homeState.get('lastSavedData'))

const getAllNodes = () => createSelector(
  selectHome,
  homeState => homeState.get('currentData').get('nodes'))

const getSelectedNode = () => createSelector(
  selectHome,
  selectCurrentNodeId,
  (homeState, selectedNodeId) => homeState.get('currentData').get('nodes').find(e => e.get('id') === selectedNodeId))

const getSelectedLink = () => createSelector(
  selectHome,
  selectCurrentLinkId,
  (homeState, selectedLinkId) => homeState.get('currentData').get('links').find(e => e.get('id') === selectedLinkId))

const getSelectedNodeOutgoingLinks = () => createSelector(
  selectHome,
  selectCurrentNodeId,
  (homeState, selectedNodeId) => homeState.get('currentData').get('links')
    .filter(e => e.get('source').get('id') === selectedNodeId))

const getSelectedNodeIncomingLinks = () => createSelector(
  selectHome,
  selectCurrentNodeId,
  (homeState, selectedNodeId) => homeState.get('currentData').get('links')
    .filter(e => e.get('target').get('id') === selectedNodeId))


export {
  selectHome,
  getLoadDialogVisibility,
  getSaveDialogVisibility,
  getCurrentStory,
  getLoadedStoryData,
  getContentItem,
  getCurrentData,
  getCurrentName,
  getAllNodes,
  getSelectedNode,
  getSelectedLink,
  getLastSavedData,
  getSelectedNodeIncomingLinks,
  getSelectedNodeOutgoingLinks,
}
