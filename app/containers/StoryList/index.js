/**
*
* StoryList
*
*/

import React from 'react'
import StoryListItem from 'containers/StoryListItem'
import Table from './Table'
import Thead from './Thead'
import Th from './Th'

function StoryList(props) {
  let content

  // render the items as story list items
  if (props.items.length > 0) {
    content = props.items.map((item, index) => (
      <StoryListItem
        key={`item-${index}`}
        item={item}
        selected={false}
      />
    ))
  }
  // no items: render a special story item instance to show that the list is empty
  else {
    content = (
      <tr>
        <td colSpan="3" style={ { padding: '10px' } }>
          No stories found
        </td>
      </tr>
    )
  }
  return (
    <Table>
      <Thead>
        <tr>
          <Th>Name</Th>
          <Th>Last Modified</Th>
          <Th>Created</Th>
        </tr>
      </Thead>
      <tbody>
        { content }
      </tbody>
    </Table>
  )
}

StoryList.propTypes = {
  items: React.PropTypes.array
  // selected: React.PropTypes.object
}

export default StoryList
