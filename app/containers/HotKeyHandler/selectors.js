import { createSelector } from 'reselect'

/**
 * Direct selector to the hotKeyHandler state domain
 */

const selectHotKeyHandlerDomain = state => state.get('hotKeyHandler')

/**
 * Other specific selectors
 */

const getKeyMap = () => createSelector(
  selectHotKeyHandlerDomain,
  substate => substate.get('keyMap')
)

const getHandlers = () => createSelector(
  selectHotKeyHandlerDomain,
  substate => substate.get('handlers')
)

export {
  getKeyMap,
  getHandlers,
}
