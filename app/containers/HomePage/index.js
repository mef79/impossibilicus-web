/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

/* ignore lots of eslint functions because d3 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import LoadDialog from 'containers/LoadDialog'
import SaveDialog from 'containers/SaveDialog'
import FormPane from 'containers/FormPane'
import Graph from 'containers/Graph'

import { showLoadDialog, hideLoadDialog, showSaveDialog, hideSaveDialog } from './actions'
import { loadStories } from '../LoadDialog/actions'

import { getLoadedStories } from 'containers/LoadDialog/selectors'
import { getCurrentStory, getLoadedStoryData } from './selectors'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.renderLoadDialog = this.renderLoadDialog.bind(this)
    this.renderSaveDialog = this.renderSaveDialog.bind(this)
  }

  renderLoadDialog() {
    return (
      <LoadDialog
        close={this.props.onCloseLoadClick}
        stories={this.props.stories}
      />
    )
  }

  renderSaveDialog() {
    return (
      <SaveDialog
        close={this.props.onCloseSaveClick}
      />
    )
  }

  render() {
    return (<div>
      <nav className="navbar navbar-inverse bg-inverse push-down">
        <div>
          <span className="btn btn-primary" id="add-node" label="Add Node">Add Node</span>
          <span className="btn btn-primary" id="undo" label="undo">Undo</span>
          <span className="btn btn-primary" id="redo" label="redo">Redo</span>
          <span
            className="btn btn-secondary"
            label="Load"
            id="load"
            onClick={this.props.onLoadClick}
          >
            Load
          </span>
          <span
            className="btn btn-secondary"
            label="Save"
            id="save"
            onClick={this.props.onSaveClick}
          >
            Save
          </span>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <Graph />
            <div id="bottom">
              No element selected
            </div>
          </div>
          <FormPane />
        </div>
        { this.renderLoadDialog() }
        { this.renderSaveDialog() }
      </div>
    </div>
    )
  }
}

HomePage.propTypes = {
  onLoadClick: PropTypes.func,
  onCloseLoadClick: PropTypes.func,
  loadDialogVisible: PropTypes.bool.isRequired,
  onSaveClick: PropTypes.func,
  onCloseSaveClick: PropTypes.func,
  saveDialogVisible: PropTypes.bool.isRequired,
  stories: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  currentStory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  storyData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
}

const mapStateToProps = createStructuredSelector({
  stories: getLoadedStories(),
  currentStory: getCurrentStory(),
  storyData: getLoadedStoryData(),
})

export function mapDispatchToProps(dispatch) {
  return {
    onLoadClick: () => {
      dispatch(showLoadDialog())
      dispatch(loadStories())
    },
    onCloseLoadClick: () => {
      dispatch(hideLoadDialog())
    },
    onSaveClick: () => {
      dispatch(showSaveDialog())
    },
    onCloseSaveClick: () => {
      dispatch(loadStories())
      dispatch(hideSaveDialog())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
