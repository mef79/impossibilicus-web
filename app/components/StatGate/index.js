/**
*
* StatGate
*
*/

import React from 'react'
// import styled from 'styled-components'


class StatGate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        [Stat Name] - [Operator (less, greater, etc)] -
        <input style={{ margin: '3px' }} type="number" />
      </div>
    )
  }
}

StatGate.propTypes = {
  gate: React.PropTypes.object.isRequired
}

export default StatGate
