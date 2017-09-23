/**
*
* ItemGate
*
*/

import React from 'react'
// import styled from 'styled-components'


class ItemGate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        Item Gate - do you have an item, or one of a set, or all of a set?
      </div>
    )
  }
}

ItemGate.propTypes = {
  gate: React.PropTypes.object.isRequired
}

export default ItemGate
