/*
 *
 * FormPane
 *
 */
import React, { PropTypes, } from 'react'
import { connect, } from 'react-redux'
import { createStructuredSelector, } from 'reselect'
import { getContentItem, } from 'containers/HomePage/selectors'
import { saveContentItem, } from 'containers/HomePage/actions'
import { updateSelectedNode, } from './actions'
import { getSelectedNode, } from 'containers/Graph/selectors'


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
    }
    if (this.props.selectedNode) {
      contentItem.selectedNode = this.props.selectedNode;
    }
    this.props.onSaveFormClick(contentItem)
  }

  render() {
    return (
      <div className="col col-5">
        <div className="card">
          <h2 className="card-header">Edit Content</h2>
          <form className="card-block">
            <div className="form-group">
              <p>Id: {this.props.selectedNode ? this.props.selectedNode.id : ''}</p>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="titleHelp"
                placeholder="Enter title"
              />
              <small id="titleHelp" className="form-text text-muted">Name your content</small>
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea className="form-control" id="content" aria-describedby="contentHelp" rows="6" placeholder="Enter your content here..."></textarea>
              <small id="contentHelp" className="form-text text-muted">Get writing</small>
            </div>
            <button className="btn btn-primary" label="Save" onClick={this.saveForm}>Save</button>
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
      dispatch(updateSelectedNode(contentItem))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPane)
