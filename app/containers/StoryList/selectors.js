import { createSelector } from 'reselect'

/**
 * Direct selector to the storyList state domain
 */
const selectStoryListDomain = () => (state) => {
  return state.get('storyList')
}

/**
 * Other specific selectors
 */


/**
 * Default selector used by StoryList
 */

const makeSelectStoryList = () => createSelector(
  selectStoryListDomain(),
  (substate) => substate.toJS()
)

export {
  selectStoryListDomain,
  makeSelectStoryList
}
