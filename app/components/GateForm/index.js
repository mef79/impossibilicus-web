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
// import styled from 'styled-components'


class GateForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  selectForm = () => {
    if (this.props.gate.get('gateType') === 'Stat') return <StatGate gate={this.props.gate} />
    if (this.props.gate.get('gateType') === 'History') return <HistoryGate gate={this.props.gate} />
    if (this.props.gate.get('gateType') === 'Item') return <ItemGate gate={this.props.gate} />
    if (this.props.gate.get('gateType') === 'Quality') return <QualityGate gate={this.props.gate} />
  }

  render() {
    return (
      <div style={{ width: '100%', margin: '3px' }}>
        {
          this.selectForm()
        }
      </div>
    )
  }
}

GateForm.propTypes = {
  gate: React.PropTypes.object.isRequired
}

export default GateForm
