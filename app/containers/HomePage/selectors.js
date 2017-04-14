/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectHome = (state) => state.get('home')

const makeSelectShowLoadDialog = () => createSelector(
  selectHome,
  (homeState) => homeState.get('showLoadDialog')
)

export {
  selectHome,
  makeSelectShowLoadDialog,
}
