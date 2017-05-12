/*
 *
 * FormPane
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getFormValues } from './selectors'
import { getContentItem, getSelectedNode } from 'containers/HomePage/selectors'
import { saveContentItem } from 'containers/HomePage/actions'
import { updateFormValues, updateSelectedNode } from './actions'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import TextArea from 'components/TextArea'

export class FormPane extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props)
    this.saveForm = this.saveForm.bind(this)
    this.updateForm = this.updateForm.bind(this)
  }

  getCurrentFormContent() {
    return {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
      id: this.props.selectedNode.get('id'),
    }
  }

  saveForm(event) {
    event.preventDefault()
    const contentItem = this.getCurrentFormContent()
    if (this.props.selectedNode) {
      contentItem.selectedNode = this.props.selectedNode
    }
    this.props.onSaveFormClick(contentItem)
  }

  updateForm() {
    this.props.onFormUpdate(this.getCurrentFormContent())
  }

  render() {
    const selectedNode = this.props.selectedNode ? this.props.selectedNode.toJS() : null

    if (!selectedNode) {
      return (
        <div style={{ width: 600 }}>
          <div className="card">
            <h2 className="card-header">Nothing selected</h2>
            <form className="card-block">
              No content
            </form>
          </div>
        </div>
      )
    }
    return (
      <div key={this.props.selectedNode} style={{ width: 600 }}>
        <div className="card">
          <h2 className="card-header">Edit Content</h2>
          <form className="card-block">
            <TextInput
              label="Title"
              id="title"
              placeholder="Enter Title"
              helpText="Your Title Goes Here"
              onChange={this.updateForm}
              value={this.props.formValues.title}
              defaultValue={selectedNode.title}
            />
            <TextArea
              label="Content"
              id="content"
              rows="6"
              placeholder="Enter Content"
              helpText="Your Content Goes Here"
              onChange={this.updateForm}
              value={this.props.formValues.content}
              defaultValue={selectedNode.content}
            />
            <Button primary onClick={this.saveForm} text="Save" />
          </form>
        </div>
      </div>
    )
  }
}

FormPane.propTypes = {
  contentItem: PropTypes.object,
  onSaveFormClick: PropTypes.func,
  onUpdateNodeClick: PropTypes.func,
  selectedNode: PropTypes.object,
  formValues: PropTypes.object,
  onFormUpdate: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  contentItem: getContentItem(),
  selectedNode: getSelectedNode(),
  formValues: getFormValues(),
})

function mapDispatchToProps(dispatch) {
  return {
    onFormUpdate: formValues => {
      dispatch(updateFormValues(formValues))
    },
    onSaveFormClick: contentItem => {
      dispatch(saveContentItem(contentItem))
      dispatch(updateSelectedNode(contentItem))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPane)
