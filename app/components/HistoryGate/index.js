/**
*
* HistoryGate
*
*/

import React from 'react'
// import styled from 'styled-components'


class HistoryGate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        History Gates check to see if you have seen/done a thing (Yes or No only)
      </div>
    )
  }
}

HistoryGate.propTypes = {
  gate: React.PropTypes.object.isRequired
}

export default HistoryGate
