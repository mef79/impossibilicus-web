/**
 * Homepage selectors
 */

import { createSelector, } from 'reselect'

const selectHome = state => state.get('home')

const getLoadDialogVisibility = () => createSelector(
  selectHome,
  homeState => homeState.get('isLoadDialogVisible')
)

const getCurrentStory = () => createSelector(
  selectHome,
  homeState => homeState.get('currentStory'))

const getLoadedStoryData = () => createSelector(
  selectHome,
  homeState => homeState.get('storyData'))

const getContentItem = () => createSelector(
  selectHome,
  homeState => homeState.get('contentItem'))

export {
  selectHome,
  getLoadDialogVisibility,
  getCurrentStory,
  getLoadedStoryData,
  getContentItem,
}
