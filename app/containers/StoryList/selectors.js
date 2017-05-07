import { createSelector } from 'reselect'

/**
 * Direct selector to the storyList state domain
 */
const selectStoryListDomain = state => state.get('storyList')

const getSelectedStoryName = () => createSelector(
  selectStoryListDomain,
  substate => substate.get('selectedStoryName')
)

export {
  getSelectedStoryName,
}
