import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Story from 'components/Story'
import { getSelectedStoryName } from 'containers/StoryList/selectors'
import { setSelectedStoryName } from 'containers/StoryList/actions'

export class StoryListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Story
        item={ this.props.item }
        selectStory={ this.props.onStoryClick }
        isSelected={ this.props.selectedStory === this.props.item.get('name') }
      />
    )
  }
}

StoryListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onStoryClick: PropTypes.func,
  selectedStory: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  selectedStory: getSelectedStoryName()
})

export function mapDispatchToProps(dispatch) {
  return {
    onStoryClick: evt => {
      dispatch(setSelectedStoryName(evt.target.innerText))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryListItem)
