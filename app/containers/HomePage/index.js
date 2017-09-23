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
import HotKeyHandler from 'containers/HotKeyHandler'

import ImportDialog from 'containers/ImportDialog'
import LoadDialog from 'containers/LoadDialog'
import SaveDialog from 'containers/SaveDialog'
import FormPane from 'containers/FormPane'
import NavigationBar from 'components/NavigationBar'
import StoryGraph from 'containers/StoryGraph'

import { isViewingOverview } from 'containers/HomePage/selectors'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  renderStoryPage = () => {
    if (!this.props.overview) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-around align-self-start">
            <StoryGraph />
            <FormPane />
          </div>
          <ImportDialog />
          <LoadDialog />
          <SaveDialog />
        </div>
      )
    }
  }

  renderOverviewPage = () => {
    if (this.props.overview) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-around align-self-start" >
            <h1>This is the overview page</h1>
            <div>There will be a variable editor here</div>
            <div>And also an overview of stories</div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <HotKeyHandler>
          <NavigationBar />
          { this.renderStoryPage() }
          { this.renderOverviewPage() }
        </HotKeyHandler>
      </div>
    )
  }
}

HomePage.propTypes = {
  overview: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  overview: isViewingOverview(),
})

export default connect(mapStateToProps)(HomePage)
