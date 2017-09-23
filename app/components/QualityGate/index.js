/**
*
* QualityGate
*
*/

import React from 'react'
// import styled from 'styled-components'


class QualityGate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        Use a quality gate for questions like How many musicals have I been in? and How much does this person like me?
      </div>
    )
  }
}

QualityGate.propTypes = {
  gate: React.PropTypes.object.isRequired
}

export default QualityGate
