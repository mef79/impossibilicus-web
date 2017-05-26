/*
 *
 * LinkForm
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSelectedLink } from 'containers/HomePage/selectors'

export class LinkForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h4>{this.props.selectedLink ? this.props.selectedLink.get('id') : ''}</h4>
      </div>
    )
  }
}

LinkForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedLink: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  selectedLink: getSelectedLink(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm)
