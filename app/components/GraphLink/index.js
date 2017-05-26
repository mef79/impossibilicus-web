/**
*
* NodeLink
*
*/

import React, { PropTypes } from 'react'
// import styled from 'styled-components'


class GraphLink extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="card" onClick={this.props.clickFunc}>
        <div className="card-block">
          <h4 className="card-title"> {this.props.label} {this.props.entity.get('title') || this.props.entity.get('id')} </h4>
        </div>
      </div>
    )
  }
}

GraphLink.propTypes = {
  entity: PropTypes.object.isRequired,
  clickFunc: PropTypes.func,
  label: PropTypes.string,
}

export default GraphLink
