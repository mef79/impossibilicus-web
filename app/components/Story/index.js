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
      <Td onClick={ props.selectStory }>{ props.item.get('name') }</Td>
      <Td>{props.item.get('nodes').size}</Td>
      <Td>{props.item.get('links').size}</Td>
      <Td><FormattedDate date={props.item.get('lastModified')} /></Td>
      <Td><FormattedDate date={props.item.get('created')} /></Td>
    </tr>
  )
}

Story.propTypes = {
  item: PropTypes.object.isRequired,
  selectStory: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default Story
