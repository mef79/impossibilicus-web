/*
 *
 * FormPane
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getFormValues } from './selectors'
import { getContentItem, getSelectedNode, getSelectedLink, getAllNodes } from 'containers/HomePage/selectors'
import { saveContentItem } from 'containers/HomePage/actions'
import { updateFormValues } from './actions'
import { setSelectedNode } from 'containers/Graph/actions'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import TextArea from 'components/TextArea'
import $ from 'jquery'

export class FormPane extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props)
    this.saveForm = this.saveForm.bind(this)
    this.updateForm = this.updateForm.bind(this)
    this.changeSelected = this.changeSelected.bind(this)
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

  changeSelected(event) {
    event.preventDefault()
    const val = $('.node-option').filter(function findOption() {
      return this.value === event.target.value
    }).attr('data-id')
    this.props.onNodeSelected(val)
  }

  updateForm() {
    this.props.onFormUpdate(this.getCurrentFormContent())
  }

  render() {
    const selectedNode = this.props.selectedNode ? this.props.selectedNode.toJS() : null
    const nodeNameArray = []
    this.props.allGraphNodes.forEach(node => nodeNameArray.push(
      <option
        className="node-option"
        data-id={node.get('id')}
        key={node.get('id')}
        value={node.get('title') || node.get('id')}
      >
        {node.get('title') || node.get('id')}
      </option>))
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
          <div className="form-group col-6">
            <select id="nodeSelect" className="form-control" onChange={this.changeSelected} value={this.props.selectedNode ? selectedNode.title || selectedNode.id : null}>
              {
                nodeNameArray
              }

            </select>
          </div>
          <h2 className="card-header">Edit Content</h2>
          <h4>{this.props.selectedLink ? this.props.selectedLink.get('id') : ''}</h4>
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
  selectedLink: PropTypes.object,
  formValues: PropTypes.object,
  onFormUpdate: PropTypes.func,
  allGraphNodes: PropTypes.object,
  onNodeSelected: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  contentItem: getContentItem(),
  selectedNode: getSelectedNode(),
  selectedLink: getSelectedLink(),
  formValues: getFormValues(),
  allGraphNodes: getAllNodes(),
})

function mapDispatchToProps(dispatch) {
  return {
    onFormUpdate: formValues => {
      dispatch(updateFormValues(formValues))
    },
    onSaveFormClick: contentItem => {
      dispatch(saveContentItem(contentItem))
    },
    onNodeSelected: nodeId => {
      dispatch(setSelectedNode(nodeId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPane)
