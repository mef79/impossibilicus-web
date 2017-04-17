/**
*
* LoadButton
*
*/

import React, { PropTypes } from 'react'
// import styled from 'styled-components'


class LoadButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div
        className={ this.props.isActive ? 'load active' : 'load'}
        onClick={ this.props.onClickLoad }
      >
        Load
      </div>
    )
  }
}

LoadButton.propTypes = {
  onClickLoad: PropTypes.func,
  isActive: PropTypes.bool.isRequired
}

export default LoadButton
