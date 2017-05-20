import { createSelector } from 'reselect'

/**
 * Direct selector to the saveDialog state domain
 */
const selectSaveDialogDomain = () => state => state.get('saveDialog')

const getValid = () => createSelector(
  selectSaveDialogDomain(),
  substate => substate.get('isValid'))

const getEnteredName = () => createSelector(
  selectSaveDialogDomain(),
  substate => substate.get('storyName'))

export {
  getValid,
  getEnteredName,
}
