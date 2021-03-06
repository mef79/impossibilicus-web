/**
*
* TextArea
*
*/

import React, { PropTypes } from 'react'
// import styled from 'styled-components'


class TextArea extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.label}>{this.props.label}</label>
        <textarea
          className="form-control"
          rows={this.props.rows}
          id={this.props.id ? this.props.id : ''}
          aria-describedby={`${this.props.label}Help`}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          value={this.props.value}
          defaultValue={this.props.defaultValue}
        />
        <small
          id={`${this.props.label}Help`}
          className="form-text text-muted"
        >
          {this.props.helpText}
        </small>
      </div>
    )
  }
}

TextArea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  rows: PropTypes.string,
  helpText: PropTypes.string,
}

export default TextArea
