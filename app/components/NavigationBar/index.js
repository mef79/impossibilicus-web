/**
*
* NavigationBar
*
*/

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Button from 'components/Button'
import ButtonGroup from 'components/ButtonGroup'

import {
  showImportDialog,
  showLoadDialog,
  showSaveDialog,
} from 'containers/HomePage/actions'
import { loadStories } from 'containers/LoadDialog/actions'

class NavigationBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse push-down">
        <div className="navButtons">
          <ButtonGroup className="btn-group" >
            <Button primary id="add-node" text="Add Node" />
            <Button primary id="undo" text="Undo" />
            <Button primary id="redo" text="Redo" />
          </ButtonGroup>
          <ButtonGroup>
            <Button id="import" text="Import" onClick={this.props.onImportClick} />
            <Button id="load" text="Load" onClick={this.props.onLoadClick} />
            <Button id="save" text="New" onClick={this.props.onSaveClick} />
          </ButtonGroup>
        </div>
      </nav>
    )
  }
}

NavigationBar.propTypes = {
  onImportClick: PropTypes.func,
  onSaveClick: PropTypes.func,
  onLoadClick: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({})

export function mapDispatchToProps(dispatch) {
  return {
    onImportClick: () => dispatch(showImportDialog()),
    onLoadClick: () => {
      dispatch(showLoadDialog())
      dispatch(loadStories())
    },
    onSaveClick: () => dispatch(showSaveDialog()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
