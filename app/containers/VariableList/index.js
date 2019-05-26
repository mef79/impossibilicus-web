/*
 *
 * VariableList
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import makeSelectVariableList from './selectors'
import { getVariables } from 'containers/OverviewPage/selectors'
import Table from 'components/Table'
import Thead from 'components/Thead'
import Th from 'components/Th'
import Td from './Td'

export class VariableList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let content
    // render the items as story list items
    if (this.props.variables && this.props.variables.size > 0) {
      content = this.props.variables.map((item, index) => (
        <tr key={index}>
          <Td>{item.get('name')}</Td>
          <Td>{item.get('type')}</Td>
          <Td></Td>
        </tr>
      ))
    }
    else {
      content = (
        <tr>
          <td colSpan="5" style={ { padding: '10px' } }>
            No variables found
          </td>
        </tr>
      )
    }
    return (
      <Table>
        <Thead>
          <tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Vals</Th>
          </tr>
        </Thead>
        <tbody>
          { content }
        </tbody>
      </Table>
    )
  }
}

VariableList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  variables: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  VariableList: makeSelectVariableList(),
  variables: getVariables(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VariableList)
