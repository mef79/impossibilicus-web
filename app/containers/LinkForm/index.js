/*
 *
 * LinkForm
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSelectedLink } from 'containers/HomePage/selectors'
import ButtonGroup from 'components/ButtonGroup'
import { setSelectedNode } from 'containers/Graph/actions'
import GraphLink from 'components/GraphLink'
import { addToKeyMap, addToHandlers, removeFromKeyMap, removeFromHandlers } from 'containers/HotKeyHandler/actions'

export class LinkForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.addHandlers({
      navigateToSourceNode: event => this.navigateToSourceNode(event),
      navigateToTargetNode: event => this.navigateToTargetNode(event),
    })
    this.props.addKeyMap({
      navigateToSourceNode: 'shift+left',
      navigateToTargetNode: 'shift+right',
    })
  }
  componentWillUnmount() {
    this.props.removeHandler('navigateToSourceNode')
    this.props.removeHandler('navigateToTargetNode')
    this.props.removeKeyMap('navigateToSourceNode')
    this.props.removeKeyMap('navigateToTargetNode')
  }
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
        label="Target: "
        clickFunc={this.navigateToTargetNode}
      />)
    }
  }

  render() {
    const fromNode = this.props.selectedLink.get('source')
    return (
      <div>
        <h2 className="card-header" tabIndex="0">Edit Link</h2>
        <form className="form-group" >
          <h4>{this.props.selectedLink ? this.props.selectedLink.get('id') : ''} </h4>
          <ButtonGroup>
            <GraphLink entity={fromNode} label="Source: " clickFunc={this.navigateToSourceNode} />
            {
              this.renderTargetLink()
            }
          </ButtonGroup>
        </form>
      </div>
    )
  }
}

LinkForm.propTypes = {
  selectedLink: PropTypes.object,
  changeNode: PropTypes.func,
  addHandlers: PropTypes.func,
  addKeyMap: PropTypes.func,
  removeHandler: PropTypes.func,
  removeKeyMap: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
  selectedLink: getSelectedLink(),
})

function mapDispatchToProps(dispatch) {
  return {
    addHandlers: handlers => dispatch(addToHandlers(handlers)),
    removeHandler: handlers => dispatch(removeFromHandlers(handlers)),
    addKeyMap: keyMap => dispatch(addToKeyMap(keyMap)),
    removeKeyMap: keyMap => dispatch(removeFromKeyMap(keyMap)),
    changeNode: id => dispatch(setSelectedNode(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm)
