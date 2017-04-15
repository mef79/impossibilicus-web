/*
 *
 * FormPane
 *
 */
import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import makeSelectFormPane from './selectors'
import Flexbox from 'flexbox-react'
import RaisedButton from 'material-ui/RaisedButton'

export class FormPane extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <Flexbox element="div" flexDirection="column" width="800px" minHeight="100%" alignItems="stretch" alignContent="stretch" justifyContent="space-between" className="form-container" >
        <Flexbox element="div" flexDirection="column">
          <TextField className="title-text-field" floatingLabelText="Name" />
          <TextField
            className="storyText"
            multiLine={true}
            floatingLabelText="Content"
            rowsMax={16}
          />
        </Flexbox>
        <RaisedButton className="savebutton" label="Save" primary={true} />
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
