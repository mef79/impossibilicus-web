/*
 *
 * FormPane
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getContentItem, getSelectedNode } from 'containers/HomePage/selectors'
import { saveContentItem } from 'containers/HomePage/actions'
import Button from 'components/Button'

export class FormPane extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props)
    this.saveForm = this.saveForm.bind(this)
  }

  saveForm(event) {
    event.preventDefault()
    const contentItem = {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
      id: this.props.selectedNode.get('id'),
    }
    if (this.props.selectedNode) {
      contentItem.selectedNode = this.props.selectedNode
    }
    this.props.onSaveFormClick(contentItem)
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
      <div style={{ width: 600 }}>
        <div className="card">
          <h2 className="card-header">Edit Content</h2>
          <form className="card-block">
            <div className="form-group">
              <div>ID: {selectedNode ? `${selectedNode.id}` : ' '}</div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="titleHelp"
                placeholder="Enter title"
                value={selectedNode.title}
              />
              <small id="titleHelp" className="form-text text-muted">Name your content</small>
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                className="form-control"
                id="content"
                aria-describedby="contentHelp"
                rows="6"
                placeholder="Enter your content here..."
                value={selectedNode.content}
              />
              <small id="contentHelp" className="form-text text-muted">Get writing</small>
            </div>
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
}

const mapStateToProps = createStructuredSelector({
  contentItem: getContentItem(),
  selectedNode: getSelectedNode(),
})

function mapDispatchToProps(dispatch) {
  return {
    onSaveFormClick: contentItem => {
      dispatch(saveContentItem(contentItem))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPane)
