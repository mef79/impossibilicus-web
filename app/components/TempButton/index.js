/**
*
* TempButton
*
*/

import React, { PropTypes } from 'react'
import styled from 'styled-components'

const Button = styled.div`
  border: 1px solid #ccc;
  background: #dbe8fc;
  border-radius: 3px;
  padding: 5px;
  margin: 5px;
  float: right;
`

class TempButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Button
        className={ this.props.isActive ? `button ${this.props.className} active` : `button ${this.props.className} disabled`}
        onClick={this.props.onClickFunc }
      >
        {this.props.buttonText}
      </Button>
    )
  }
}

TempButton.propTypes = {
  onClickFunc: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
}

export default TempButton
