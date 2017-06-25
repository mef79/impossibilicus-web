/**
*
* GraphLink
*
*/

import React, { PropTypes } from 'react'
// import styled from 'styled-components'


class GraphLink extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="btn btn-primary" onClick={this.props.clickFunc}>
        <div key={this.props.entity.get('id')}>
          {this.props.label}
          {this.props.entity.get('title') || this.props.entity.get('id')}
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
