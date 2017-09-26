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
import ButtonGroup from 'components/ButtonGroup'
import Button from 'components/Button'
import GATE_TYPES from 'utils/gatetypes'
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
    const gateTypes = [
      { value: GATE_TYPES.OPEN, outputText: 'Open' },
      { value: GATE_TYPES.ITEM, outputText: 'Item' },
      { value: GATE_TYPES.QUALITY, outputText: 'Quality' },
      { value: GATE_TYPES.HISTORY, outputText: 'History' },
      { value: GATE_TYPES.STAT, outputText: 'Stat' }
    ]
    gateTypes.forEach(gateType => {
      const outputText = gateType.outputText
      const addAction = event => {
        event.preventDefault()
        this.props.addGate(this.props.selectedLink.get('id'), gateType.value)
      }
      gatesList.push(
        <Button
          secondary
          key={outputText}
          text={outputText}
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
    const GateHeader = styled.h2`
      margin-top: 1em;
    `
    const LinkHeader = styled.div`
      display: flex;
      flex-direction: row;
      align-items: space-evenly;
      justify-content: space-around;
      margin: 1em;
    `
    const SaveButtonContainer = styled.span`
      float: right;
    `
    const LinkLabel = styled.h4`
      align-self: flex-end;
    `

    const fromNode = this.props.selectedLink.get('source')
    return (
      <div>
        <h2 className="card-header" tabIndex="0">Edit Link
          <SaveButtonContainer>
            <Button text="Save" />
          </SaveButtonContainer>
        </h2>
        <form className="form-group card-block" >
          <LinkHeader>
            <LinkLabel>Id: {this.props.selectedLink ? this.props.selectedLink.get('id') : ''} </LinkLabel>
            <div>
              <ButtonGroup>
                <GraphLink entity={fromNode} label="Source Node: " clickFunc={this.navigateToSourceNode} />
                {
                  this.renderTargetLink()
                }
              </ButtonGroup>
            </div>
          </LinkHeader>
          <ButtonGroup>
            <Button
              disabled
              text="Add A Gate"
            />
            {this.renderGateTypes()}
          </ButtonGroup>
          <GateHeader>Current Gates</GateHeader>
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
  addGate: PropTypes.func,
  removeGate: PropTypes.func,
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
    changeNode: id => dispatch(setSelectedNode(id)),
    addGate: (linkId, gateType) => dispatch(addGateToSelectedLink(linkId, gateType)),
    removeGate: (linkId, gateId) => dispatch(removeGateFromSelectedLink(linkId, gateId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm)
