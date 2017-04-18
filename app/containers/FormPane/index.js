/*
 *
 * FormPane
 *
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import makeSelectFormPane from './selectors'


export class FormPane extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="col-5 ">
        <div className="container">
          <div className="card">
            <h2 className="card-header">Edit Content</h2>
            <form className="card-block">

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title"></input>
                <small id="titleHelp" className="form-text text-muted">Name your content</small>
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea className="form-control" id="content" aria-describedby="contentHelp" rows="6" placeholder="Enter your content here..."></textarea>
                <small id="contentHelp" className="form-text text-muted">Get writing</small>
              </div>
              <button className="btn btn-primary" label="Save">Save</button>
            </form>
          </div>
        </div>
      </div>
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
