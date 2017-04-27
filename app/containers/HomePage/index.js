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

import { showLoadDialog, showSaveDialog } from './actions'
import { loadStories } from '../LoadDialog/actions'

import { getLoadedStories } from 'containers/LoadDialog/selectors'
import { getCurrentStory, getLoadedStoryData } from './selectors'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (<div>
      <nav className="navbar navbar-inverse bg-inverse push-down">
        <div className="navButtons">
          <div className="btn-group" >
            <span className="btn btn-primary" id="add-node" label="Add Node">Add Node</span>
            <span className="btn btn-primary" id="undo" label="undo">Undo</span>
            <span className="btn btn-primary" id="redo" label="redo">Redo</span>
          </div>
          <div className="btn-group" >
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
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <Graph />
          <FormPane />
        </div>
        <LoadDialog />
        <SaveDialog />
      </div>
    </div>
    )
  }
}

HomePage.propTypes = {
  stories: PropTypes.object,
  currentStory: PropTypes.string,
  storyData: PropTypes.object,
  onLoadClick: PropTypes.func,
  onSaveClick: PropTypes.func,
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
    onSaveClick: () => dispatch(showSaveDialog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
