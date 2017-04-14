import React, { PropTypes } from 'react'
import StoryListItem from 'containers/StoryListItem'
import Table from './Table'
import Thead from './Thead'
import Th from './Th'
import { getLoadedStories } from 'containers/LoadDialog/selectors'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

function StoryList(props) {
  let content

  // render the items as story list items
  if (props.stories && props.stories.length > 0) {
    content = props.stories.map((item, index) => (
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
        <td colSpan="5" style={ { padding: '10px' } }>
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
          <Th>Nodes</Th>
          <Th>Links</Th>
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
  stories: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
  stories: getLoadedStories()
})

export default connect(mapStateToProps)(StoryList)
