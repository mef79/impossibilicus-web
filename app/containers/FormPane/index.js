/*
 *
 * FormPane
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSelectedNode, getSelectedLink } from 'containers/HomePage/selectors'
import LinkForm from 'containers/LinkForm'
import NodeForm from 'containers/NodeForm'

const formStyle = {
  padding: '1em',
  width: '600px'
}

export class FormPane extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  selectForm = () => {
    if (this.props.selectedNode) return <NodeForm />
    if (this.props.selectedLink) return <LinkForm />
  }

  render() {
    if (!this.props.selectedNode && !this.props.selectedLink) {
      return (
        <div style={formStyle}>
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
      <div style={formStyle}>
        {
          this.selectForm()
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

function mapDispatchToProps() {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPane)
