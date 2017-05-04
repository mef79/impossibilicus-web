/**
*
* ButtonGroup
*
*/

import React, { PropTypes } from 'react'

class ButtonGroup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="btn-group">
        {this.props.children}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  children: PropTypes.array.isRequired,
}

export default ButtonGroup
