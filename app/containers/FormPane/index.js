/*
 *
 * FormPane
 *
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import makeSelectFormPane from './selectors'
import Flexbox from 'flexbox-react'

export class FormPane extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <Flexbox element="div" flexDirection="column" width="800px" minHeight="100%" alignItems="stretch" alignContent="stretch" justifyContent="space-between" className="form-container" >
        <Flexbox element="div" flexDirection="column">
          <input type="text" className="title-text-field" placeholder="Name" />
          <input type="text"
            className="storyText"
          />
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div className="dropdown-menu">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Action</a>
    </div>
            </div>
        </Flexbox>
        <button className="btn btn-primary savebutton" label="Save"  />
      </Flexbox>
    )
  }
}

FormPane.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  FormPane: makeSelectFormPane()
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPane)
