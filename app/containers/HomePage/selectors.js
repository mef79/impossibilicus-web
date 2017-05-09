/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectHome = state => state.get('home')

// todo: figure out how to get this from an import from graph
const selectCurrentNodeId = state => state.get('graph').get('selectedNodeId')

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

const getSelectedNode = () => createSelector(
  selectHome,
  selectCurrentNodeId,
  (homeState, selectedNodeId) => homeState.get('currentData').get('nodes').find(e => e.get('id') === selectedNodeId))

export {
  selectHome,
  getLoadDialogVisibility,
  getSaveDialogVisibility,
  getCurrentStory,
  getLoadedStoryData,
  getContentItem,
  getCurrentData,
  getSelectedNode,
}
