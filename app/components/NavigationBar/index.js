/**
*
* NavigationBar
*
*/

import React from 'react'
import Button from 'components/Button'
import ButtonGroup from 'components/ButtonGroup'
// import styled from 'styled-components'


class NavigationBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse push-down">
        <div className="navButtons">
          <ButtonGroup className="btn-group" >
            <Button primary id="add-node" text="Add Node" />
            <Button primary id="undo" text="Undo" />
            <Button primary id="redo" text="Redo" />
          </ButtonGroup>
          <ButtonGroup>
            <Button id="load" text="Load" onClick={this.props.onLoadClick} />
            <Button id="save" text="Save" onClick={this.props.onSaveClick} />
          </ButtonGroup>
        </div>
      </nav>
    )
  }
}

NavigationBar.propTypes = {
  onSaveClick: React.PropTypes.func,
  onLoadClick: React.PropTypes.func,
}

export default NavigationBar
