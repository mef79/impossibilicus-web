/*
 *
 * HotKeyHandler
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getKeyMap, getHandlers } from './selectors'
import { HotKeys } from 'react-hotkeys'

export class HotKeyHandler extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <HotKeys keyMap={this.props.keyMap.toJS()} handlers={this.props.handlers.toJS()} >
        {React.Children.toArray(this.props.children)}
      </HotKeys>
    )
  }
}

HotKeyHandler.propTypes = {
  handlers: PropTypes.object,
  keyMap: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node
}

const mapStateToProps = createStructuredSelector({
  handlers: getHandlers(),
  keyMap: getKeyMap()
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotKeyHandler)
