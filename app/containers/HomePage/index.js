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
import NavigationBar from 'components/NavigationBar'
import StoryGraph from 'containers/StoryGraph'
import { showLoadDialog, showSaveDialog } from './actions'
import { loadStories } from '../LoadDialog/actions'

import { getLoadedStories } from 'containers/LoadDialog/selectors'
import { getCurrentStory, getLoadedStoryData } from './selectors'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (<div>
      <NavigationBar onLoadClick={this.props.onLoadClick} onSaveClick={this.props.onSaveClick} />
      <div className="container-fluid">
        <div className="row justify-content-around align-self-start">
          <StoryGraph />
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
