/*
 *
 * StoryListItem
 *
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Story from 'components/Story'
import { createStructuredSelector } from 'reselect'
import { getCurrentStory } from 'containers/HomePage/selectors'
import { setCurrentStory } from 'containers/HomePage/actions'

export class StoryListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Story
        item={ this.props.item }
        selectStory={ this.props.onStoryClick }
        isSelected={ this.props.currentStory === this.props.item.name }
      />
    )
  }
}

StoryListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onStoryClick: PropTypes.func,
  currentStory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
}

const mapStateToProps = createStructuredSelector({
  currentStory: getCurrentStory()
})

export function mapDispatchToProps(dispatch) {
  return {
    onStoryClick: evt => {
      dispatch(setCurrentStory(evt.target.innerText))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryListItem)
