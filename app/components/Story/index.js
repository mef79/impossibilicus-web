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
      <Td onClick={ function () { console.log('loaded a story') } }>{ props.item.name }</Td>
      <Td>{props.item.nodes.length}</Td>
      <Td>{props.item.links.length}</Td>
      <Td><FormattedDate date={props.item.lastModified} /></Td>
      <Td><FormattedDate date={props.item.created} /></Td>
    </tr>
  )
}

Story.propTypes = {
  item: React.PropTypes.object.isRequired
}

export default Story
