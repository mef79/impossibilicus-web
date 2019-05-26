/**
*
* Button
*
*/

import React, { PropTypes } from 'react'
import classNames from 'classnames'

class Button extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const btnClass = classNames({
      btn: true,
      'btn-primary': this.props.primary,
      'btn-secondary': !this.props.primary,
      disabled: this.props.disabled,
    })
    return (
      <button
        disabled={this.props.disabled}
        className={btnClass}
        onClick={!this.props.disabled ? this.props.onClick : undefined}
        id={this.props.id}
      >
        {this.props.text}
      </button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  id: PropTypes.string,

}

export default Button
