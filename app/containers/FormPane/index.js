/*
 *
 * FormPane
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getContentItem, getSelectedNode, getSelectedLink, getAllNodes } from 'containers/HomePage/selectors'
import LinkForm from 'containers/LinkForm'
import NodeForm from 'containers/NodeForm'

export class FormPane extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  render() {
    if (!this.props.selectedNode) {
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
      <div  style={{ width: 600 }}>
        {
          this.props.selectedNode ? <NodeForm/> : ''
        }        
      </div>
    )
  }
}

FormPane.propTypes = {
  selectedNode: PropTypes.object,
  selectedLink: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({  
  selectedNode: getSelectedNode(),
  selectedLink: getSelectedLink(),  
})

function mapDispatchToProps(dispatch) {
  return {    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPane)
