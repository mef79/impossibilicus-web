import { createSelector } from 'reselect'

/**
 * Direct selector to the importDialog state domain
 */
const selectImportDialogDomain = () => state => state.get('importDialog')

const getValid = () => createSelector(
  selectImportDialogDomain(),
  substate => substate.get('isValid'))

const getFile = () => createSelector(
  selectImportDialogDomain(),
  substate => substate.get('file'))

const getName = () => createSelector(
  selectImportDialogDomain(),
  substate => substate.get('name'))

export {
  getValid,
  getFile,
  getName,
}
