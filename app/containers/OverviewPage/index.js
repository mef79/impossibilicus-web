/*
 *
 * OverviewPage
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getVariables } from './selectors'

import VariableList from 'containers/VariableList'
import StoryList from 'containers/StoryList'
import Button from 'components/Button'

export class OverviewPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-around align-self-start" >
          <h1>This is the overview page</h1>
        </div>
        <div>
          <Button text="Add Variable" primary />
        </div>
        <VariableList />
        <StoryList />
      </div>
    )
  }
}

OverviewPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  variables: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  variables: getVariables(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage)
