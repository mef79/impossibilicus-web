/**
*
* GateForm
*
*/

import React from 'react'
import StatGate from 'components/StatGate'
import HistoryGate from 'components/HistoryGate'
import ItemGate from 'components/ItemGate'
import QualityGate from 'components/QualityGate'
import GATE_TYPES from 'utils/gatetypes'
// import styled from 'styled-components'


class GateForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  whichForm = () => {
    switch (this.props.gate.get('gateType')) {
      case GATE_TYPES.STAT : return <StatGate gate={this.props.gate} />
      case GATE_TYPES.HISTORY : return <HistoryGate gate={this.props.gate} />
      case GATE_TYPES.ITEM : return <ItemGate gate={this.props.gate} />
      case GATE_TYPES.QUALITY : return <QualityGate gate={this.props.gate} />
      default :
    }
  }

  render() {
    return (
      <div style={{ width: '100%', margin: '3px' }}>
        {
          this.whichForm()
        }
      </div>
    )
  }
}

GateForm.propTypes = {
  gate: React.PropTypes.object.isRequired
}

export default GateForm
