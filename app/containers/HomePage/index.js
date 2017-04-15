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
import LoadDialog from 'containers/LoadDialog'
import FlatButton from 'material-ui/FlatButton'
import { loadStories } from '../LoadDialog/actions'
import { connect } from 'react-redux'
import { getLoadedStories } from 'containers/LoadDialog/selectors'
import { createStructuredSelector } from 'reselect'
import { showLoadDialog, hideLoadDialog } from './actions'
import { makeSelectShowLoadDialog, makeSelectCurrentStory, makeSelectStoryData } from './selectors'
import Flexbox from 'flexbox-react'
import FormPane from 'containers/FormPane'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import Graph from 'containers/Graph'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.renderLoadDialog = this.renderLoadDialog.bind(this)
  }

  renderLoadDialog() {
    if (this.props.showLoadDialog) {
      return (
        <LoadDialog
          close={ this.props.onCloseClick }
          stories={ this.props.stories }
        />
      )
    }
  }

  render() {
    return (
      <Flexbox flexDirection="column" minHeight="100%" >
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <FlatButton id="add-node" label="Add Node" />
            <FlatButton id="undo" label="undo" />
            <FlatButton id="redo" label="redo" />
          </ToolbarGroup>
          <ToolbarGroup>
            <FlatButton label="Load" id="load" onClick={this.props.onLoadClick} />
          </ToolbarGroup>
        </Toolbar>
        <Flexbox flexDirection="row" alignItems="stretch" justifyContent="center" height="100%" minHeight="100%">
          <div className="sectionContainer">
            <div>
              <Graph />
              <div id="bottom">
                No element selected
              </div>
            </div>
          </div>
          <FormPane />
        </Flexbox>
        {this.renderLoadDialog()}
      </Flexbox>
    )
  }
}

HomePage.propTypes = {
  onLoadClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  showLoadDialog: PropTypes.bool.isRequired,
  stories: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  currentStory: PropTypes.string,
  storyData: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
  showLoadDialog: makeSelectShowLoadDialog(),
  stories: getLoadedStories(),
  currentStory: makeSelectCurrentStory(),
  storyData: makeSelectStoryData()
})

export function mapDispatchToProps(dispatch) {
  return {
    onLoadClick: () => {
      dispatch(showLoadDialog())
      dispatch(loadStories())
    },
    onCloseClick: () => {
      dispatch(hideLoadDialog())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
