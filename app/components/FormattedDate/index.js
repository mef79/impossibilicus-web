/**
*
* FormattedDate
*
*/

import React from 'react'

class FormattedDate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
  }

  formatDate(date) {
    if (!date) {
      return ''
    }
    return (new Date(date)).toLocaleString()
  }

  render() {
    return (
      <span>
        {this.formatDate(this.props.date)}
      </span>
    )
  }
}

FormattedDate.propTypes = {
  date: React.PropTypes.number
}

export default FormattedDate
