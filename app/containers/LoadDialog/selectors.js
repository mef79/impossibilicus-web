import { createSelector } from 'reselect'

/**
 * Direct selector to the loadDialog state domain
 */
const selectLoadDialogDomain = state => state.get('loadDialog')

/**
 * Other specific selectors
 */
const getLoadingState = () => createSelector(
  selectLoadDialogDomain,
  loadDialogState => loadDialogState.get('loading')
)

const getLoadingError = () => createSelector(
  selectLoadDialogDomain,
  loadDialogState => loadDialogState.get('error')
)

const getLoadedStories = () => createSelector(
  selectLoadDialogDomain,
  loadDialogState => loadDialogState.get('stories')
)

export {
  getLoadedStories,
  getLoadingError,
  getLoadingState,
}
