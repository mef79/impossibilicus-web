/*
 *
 * LinkForm
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSelectedLink } from 'containers/HomePage/selectors'
import { setSelectedNode } from 'containers/Graph/actions'
import GraphLink from 'components/GraphLink'

export class LinkForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  navigateToSourceNode = event => {
    event.preventDefault()
    this.props.changeNode(this.props.selectedLink.get('source').get('id'))
  }

  navigateToTargetNode = event => {
    event.preventDefault()
    this.props.changeNode(this.props.selectedLink.get('target').get('id'))
  }

  renderTargetLink = () => {
    if (this.props.selectedLink.get('target')) {
      return (<GraphLink
        entity={this.props.selectedLink.get('target')}
        label="Target :"
        clickFunc={this.navigateToTargetNode}
      />)
    }
  }

  render() {
    const fromNode = this.props.selectedLink.get('source')
    return (
      <div>
        <h2 className="card-header">Edit Link</h2>
        <form >
          <h4>{this.props.selectedLink ? this.props.selectedLink.get('id') : ''} </h4>
          <GraphLink entity={fromNode} label="Source :" clickFunc={this.navigateToSourceNode} />
          {
            this.renderTargetLink()
          }
        </form>
      </div>
    )
  }
}

LinkForm.propTypes = {
  selectedLink: PropTypes.object,
  changeNode: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  selectedLink: getSelectedLink(),
})

function mapDispatchToProps(dispatch) {
  return {
    changeNode: id => dispatch(setSelectedNode(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm)
