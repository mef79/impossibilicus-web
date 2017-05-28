/*
 *
 * NodeForm
 *
 */
import { saveContentItem } from 'containers/HomePage/actions'
import React, { PropTypes } from 'react'
import { getFormValues } from 'containers/FormPane/selectors'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getContentItem, getSelectedNode, getSelectedNodeIncomingLinks, getSelectedNodeOutgoingLinks } from 'containers/HomePage/selectors'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import TextArea from 'components/TextArea'
import { updateFormValues } from 'containers/FormPane/actions'
import { setSelectedNode, setSelectedLink } from 'containers/Graph/actions'
import GraphLink from 'components/GraphLink'


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

  navigateToTargetLink = event => {
    this.props.onLinkSelected(event.target.key)
  }

  updateForm = () => {
    this.props.onFormUpdate(this.getCurrentFormContent())
  }

  renderLinks = (links, label) => {
    if (links) {
      const linkList = []
      links.forEach(x =>
        linkList.push(
          <GraphLink
            entity={x}
            key={x.get('id')}
            label={label}
            clickFunc={() => this.props.onLinkSelected(x.get('id'))}
          />
        )
      )
      return linkList
    }
  }

  render() {
    return (
      <div key={this.props.selectedNode.get('id')}>
        <h2 className="card-header">Edit Content</h2>
        <form className="card-block">
          <TextInput
            label="Title"
            id="title"
            placeholder="Enter Title"
            helpText="Your Title Goes Here"
            onChange={this.updateForm}
            value={this.props.formValues.title}
            defaultValue={this.props.selectedNode.get('title')}
          />
          <TextArea
            label="Content"
            id="content"
            rows="6"
            placeholder="Enter Content"
            helpText="Your Content Goes Here"
            onChange={this.updateForm}
            value={this.props.formValues.content}
            defaultValue={this.props.selectedNode.get('content')}
          />
          <Button primary onClick={this.saveForm} text="Save" />
          {this.renderLinks(this.props.incomingLinks, '=>')}
          {this.renderLinks(this.props.outgoingLinks, '<=')}
        </form>
      </div>
    )
  }
}

NodeForm.propTypes = {
  formValues: PropTypes.object,
  onFormUpdate: PropTypes.func,
  selectedNode: PropTypes.object,
  onSaveFormClick: PropTypes.func,
  incomingLinks: PropTypes.object,
  outgoingLinks: PropTypes.object,
  onLinkSelected: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  contentItem: getContentItem(),
  formValues: getFormValues(),
  selectedNode: getSelectedNode(),
  incomingLinks: getSelectedNodeIncomingLinks(),
  outgoingLinks: getSelectedNodeOutgoingLinks(),
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
    onLinkSelected: linkId => {
      dispatch(setSelectedLink(linkId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeForm)
