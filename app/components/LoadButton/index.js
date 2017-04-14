/**
*
* LoadButton
*
*/

import React from 'react'
// import styled from 'styled-components'


class LoadButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div onClick={ this.props.onClickLoad }>Load</div>
    )
  }
}

LoadButton.propTypes = {
  onClickLoad: React.PropTypes.func
}

export default LoadButton
