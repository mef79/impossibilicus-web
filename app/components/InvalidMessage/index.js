/**
*
* InvalidMessage
*
*/

import React, { PropTypes } from 'react'
import styled from 'styled-components'

const InvalidText = styled.span`
  color: red;
  font-size: 16px;
  display: inline-block;
  padding: 8px 0px;
`

class InvalidMessage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (this.props.isVisible) {
      return (
        <InvalidText>
          {this.props.text}
        </InvalidText>
      )
    }
    return (<span />)
  }
}

InvalidMessage.propTypes = {
  isVisible: PropTypes.bool,
  text: PropTypes.string,
}

export default InvalidMessage
