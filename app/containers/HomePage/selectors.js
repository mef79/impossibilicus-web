/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectHome = state => state.get('home')

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

export {
  selectHome,
  getLoadDialogVisibility,
  getSaveDialogVisibility,
  getCurrentStory,
  getLoadedStoryData,
  getContentItem,
  getCurrentData,
}
