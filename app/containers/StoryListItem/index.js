/*
 *
 * StoryListItem
 *
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Story from 'components/Story'
import { createSelector } from 'reselect'
import { makeSelectStoryList } from '../StoryList/selectors'

export class StoryListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Story
        item={this.props.item}
        isSelected={this.props.selected}
      />
    )
  }
}

StoryListItem.propTypes = {
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired
}

const mapStateToProps = createSelector(
  makeSelectStoryList(),
  (name) => ({ name })
)

export default connect(mapStateToProps)(StoryListItem)
