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
import { listGateTypes, getFilteredGates, getFilterText } from 'containers/Gates/selectors'
import { updateFilterText } from 'containers/Gates/actions'
import ButtonGroup from 'components/ButtonGroup'
import Button from 'components/Button'
import { setSelectedNode } from 'containers/Graph/actions'
import { removeGateFromSelectedLink, addGateToSelectedLink } from 'containers/HomePage/actions'
import GraphLink from 'components/GraphLink'
import GateForm from 'components/GateForm'
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
        label="Target Node: "
        clickFunc={this.navigateToTargetNode}
      />)
    }
  }

  // show a list of types of gates that can be added
  // will be from a dropdown in the future
  renderGateTypes = () => {
    const gatesList = []
    this.props.gateTypes.toJS().forEach(gateType => {
      const addAction = event => {
        event.preventDefault();
        this.props.addGate(this.props.selectedLink.get('id'), gateType)
      }
      gatesList.push(
        <Button
          secondary
          key={gateType}
          text={gateType}
          onClick={addAction}
        />
      )
    })
    return gatesList
  }

  renderCurrentGates = () => {
    const gatesList = []
    if (this.props.selectedLink) {
      this.props.selectedLink.get('gates').forEach(gate => {
        // let clickFunc = (e) => {
        //   e.preventDefault()
        //   this.props.removeGate(this.props.selectedLink.get('id'), gate.get('id'))
        // }
        gatesList.push(
          <GateForm key={gate.get('id')} gate={gate} />

        )
      })
    }
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
        <h2 className="card-header" tabIndex="0">Edit Link
          <span style={{ float: 'right' }}>
            <Button text="Save" />
          </span>
        </h2>
        <form className="form-group card-block" >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'space-evenly', justifyContent: 'space-around', margin: '1em' }}>
            <h4 style={{ alignSelf: 'flex-end' }}>Id: {this.props.selectedLink ? this.props.selectedLink.get('id') : ''} </h4>
            <div>
              <ButtonGroup>
                <GraphLink entity={fromNode} label="Source Node: " clickFunc={this.navigateToSourceNode} />
                {
                  this.renderTargetLink()
                }
              </ButtonGroup>
            </div>
          </div>
          <ButtonGroup>
            <Button
              disabled
              text="Add A Gate"

            />
            {this.renderGateTypes()}
          </ButtonGroup>
          <h4 style={{ marginTop: '1em' }}>Current Gates</h4>
          <GateContainer>
            {this.renderCurrentGates()}
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
  gateTypes: PropTypes.object,
  filteredGates: PropTypes.array,
  updateFilterText: PropTypes.func,
  filterText: PropTypes.string,
  filterGates: PropTypes.func,
  addGate: PropTypes.func,
  removeGate: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  selectedLink: getSelectedLink(),
  gateTypes: listGateTypes(),
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
    filterGates: filterText => dispatch(updateFilterText(filterText)),
    addGate: (linkId, gateType) => dispatch(addGateToSelectedLink(linkId, gateType)),
    removeGate: (linkId, gateId) => dispatch(removeGateFromSelectedLink(linkId, gateId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm)
