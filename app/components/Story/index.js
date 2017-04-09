/**
*
* Story
*
*/

import React from 'react'
import Td from './Td'
import FormattedDate from 'components/FormattedDate'

function Story(props) {
  return (
    <tr>
      <Td>{props.item.name}</Td>
      <Td><FormattedDate date={props.item.lastModified} /></Td>
      <Td><FormattedDate date={props.item.created} /></Td>
    </tr>
  )
}

Story.propTypes = {
  // isSelected: React.PropTypes.bool.isRequired,
  item: React.PropTypes.object.isRequired
}

export default Story
