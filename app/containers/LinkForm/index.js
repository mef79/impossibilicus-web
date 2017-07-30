/*
 *
 * LinkForm
 *
 */

import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSelectedLink } from 'containers/HomePage/selectors'
import { getAllGates, getFilteredGates, getFilterText } from 'containers/Gates/selectors'
import { updateFilterText } from 'containers/Gates/actions'
import ButtonGroup from 'components/ButtonGroup'
import TextInput from 'components/TextInput'
import { setSelectedNode } from 'containers/Graph/actions'
import GraphLink from 'components/GraphLink'
import GatePill from 'components/GatePill'
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

  updateFilter = () => {
    this.props.filterGates(document.getElementById('filterGates').value)
  }

  removeGate = () => {
    const clickActions = []
    clickActions.push({ clickFunc: () => alert('remove'), symbol: 'x' })
    clickActions.push({ clickFunc: () => alert('add'), symbol: '+' })
    return clickActions
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

  renderGates = () => {
    const gatesList = []
    this.props.gates.toJS().forEach(x =>
      gatesList.push(
        <GatePill color="rebeccapurple" actions={this.removeGate()} key={x} name={x} />
      )
    )
    return gatesList
  }

  renderFilteredGates = () => {
    const gatesList = []
    this.props.filteredGates.forEach(x =>
      gatesList.push(
        <GatePill color="rebeccapurple" actions={this.removeGate()} key={x} name={x} />
      )
    )
    return gatesList
  }

  render() {
    const GateContainer = styled.div`
      display: flex;
      flex-direction:row;
      margin-bottom:1em;
      flex-wrap: wrap;
    `
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
          <TextInput
            label="Filter Gates"
            id="filterGates"
            placeholder="..."
            helpText="Type to filter list"
            onChange={this.updateFilter}
            value={this.props.filterText}
          />
          <GateContainer>
            {this.renderGates()}
          </GateContainer>
          <GateContainer>
            {this.renderFilteredGates()}
          </GateContainer>
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
  removeKeyMap: PropTypes.func,
  gates: PropTypes.object,
  filteredGates: PropTypes.array,
  updateFilterText: PropTypes.func,
  filterText: PropTypes.string,
  filterGates: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  selectedLink: getSelectedLink(),
  gates: getAllGates(),
  filteredGates: getFilteredGates(),
  filterText: getFilterText(),
})

function mapDispatchToProps(dispatch) {
  return {
    addHandlers: handlers => dispatch(addToHandlers(handlers)),
    removeHandler: handlers => dispatch(removeFromHandlers(handlers)),
    addKeyMap: keyMap => dispatch(addToKeyMap(keyMap)),
    removeKeyMap: keyMap => dispatch(removeFromKeyMap(keyMap)),
    changeNode: id => dispatch(setSelectedNode(id)),
    filterGates: filterText => dispatch(updateFilterText(filterText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm)
