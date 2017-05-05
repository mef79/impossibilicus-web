import { createSelector } from 'reselect'

/**
 * Direct selector to the saveDialog state domain
 */
const selectSaveDialogDomain = () => state => state.get('saveDialog')

const makeSelectSaveDialog = () => createSelector(
  selectSaveDialogDomain(),
  substate => substate.toJS()
)

const getStoryName = () => createSelector(
  selectSaveDialogDomain(),
  substate => substate.get('storyName')
)

const getValid = () => createSelector(
  selectSaveDialogDomain(),
  substate => substate.get('isValid')
)

export default makeSelectSaveDialog
export {
  selectSaveDialogDomain,
  getStoryName,
  getValid,
}
