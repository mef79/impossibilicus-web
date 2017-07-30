/**
*
* GatePill
*
*/

import React from 'react'
import styled from 'styled-components'


class GatePill extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const Pill = styled.div`
      font-size: 1.5em;
      margin-right: 5px;
      /* width: auto; */
      padding-left: 8px;
      border-radius: 12px;
      padding-right: 8px;
      padding-top: 3px;
      padding-bottom: 3px;
      color: white;
      margin-bottom: 6px;
      background-color: ${this.props.color};
      display:flex;
      justify-content: space-between;
      cursor: default;
    `

    const Actions = []
    let i = 0
    this.props.actions.forEach(element => {
      i++
      Actions.push(
        <div key={i} style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={element.clickFunc}>
          {element.symbol}
        </div>)
    }, this)
    return (
      <Pill onClick={this.props.clickFunc}>
        <div style={{ cursor: 'default' }}>
          {this.props.name}
        </div>
        {Actions}
      </Pill>
    )
  }
}

GatePill.propTypes = {
  name: React.PropTypes.string,
  color: React.PropTypes.string,
  clickFunc: React.PropTypes.func,
  actions: React.PropTypes.array,
}

export default GatePill
