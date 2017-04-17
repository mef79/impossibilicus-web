/**
*
* Story
*
*/

import React, { PropTypes } from 'react'
import Td from './Td'
import FormattedDate from 'components/FormattedDate'

function Story(props) {
  return (
    <tr className={props.isSelected ? 'selected' : ''}>
      <Td onClick={ props.selectStory }>{ props.item.name }</Td>
      <Td>{props.item.nodes.length}</Td>
      <Td>{props.item.links.length}</Td>
      <Td><FormattedDate date={props.item.lastModified} /></Td>
      <Td><FormattedDate date={props.item.created} /></Td>
    </tr>
  )
}

Story.propTypes = {
  item: PropTypes.object.isRequired,
  selectStory: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default Story
