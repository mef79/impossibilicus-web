/*
 *
 * NodeForm
 *
 */
import { saveContentItem } from 'containers/HomePage/actions'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getContentItem, getSelectedNode } from 'containers/HomePage/selectors'
import makeSelectNodeForm from './selectors'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import TextArea from 'components/TextArea'
import { updateFormValues } from './actions'
import { setSelectedNode } from 'containers/Graph/actions'


export class NodeForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  getCurrentFormContent = () => {
    return {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
      id: this.props.selectedNode.get('id'),
    }
  }

  saveForm = event => {
    event.preventDefault()
    const contentItem = this.getCurrentFormContent()
    if (this.props.selectedNode) {
      contentItem.selectedNode = this.props.selectedNode
    }
    this.props.onSaveFormClick(contentItem)
  }

  updateForm = () => {
    this.props.onFormUpdate(this.getCurrentFormContent())
  }

  render() {
    return (
      <div>
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
    )
  }
}

NodeForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  onFormUpdate: PropTypes.func,
  selectedNode: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  NodeForm: makeSelectNodeForm(),
  contentItem: getContentItem(),
  formValues: getFormValues(),
  selectedNode: getSelectedNode(),
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

export default connect(mapStateToProps, mapDispatchToProps)(NodeForm)
