/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectHome = (state) => state.get('home')

const makeSelectShowLoadDialog = () => createSelector(
  selectHome,
  (homeState) => homeState.get('showLoadDialog')
)

const makeSelectCurrentStory = () => createSelector(
  selectHome,
  (homeState) => homeState.get('currentStory'))

const makeSelectStoryData = () => createSelector(
  selectHome,
  (homeState) => homeState.get('storyData'))

export {
  selectHome,
  makeSelectShowLoadDialog,
  makeSelectCurrentStory,
  makeSelectStoryData
}
