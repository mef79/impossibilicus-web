import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Modal from 'react-modal'
import ModalHeader from 'components/ModalHeader'
import ModalClose from 'components/ModalClose'
import StoryList from 'containers/StoryList'
import LoadButton from 'components/LoadButton'
import { getLoadedStories, getLoadingState, getLoadingError } from './selectors'
import { loadStory, hideLoadDialog } from 'containers/HomePage/actions'
import { getCurrentStory } from 'containers/HomePage/selectors'

export class LoadDialog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Modal isOpen={true} contentLabel="Dialog">
        <ModalHeader>Load Story</ModalHeader>
        <ModalClose onClick={this.props.close}>x</ModalClose>
        <StoryList stories={this.props.stories} />
        <LoadButton
          onClickLoad={ this.props.onLoadClick }
          isActive={ !!this.props.currentStory }
        >
          Load
        </LoadButton>
      </Modal>
    )
  }
}

LoadDialog.propTypes = {
  close: PropTypes.func.isRequired,
  stories: PropTypes.array,
  onLoadClick: PropTypes.func,
  currentStory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
}

const mapStateToProps = createStructuredSelector({
  stories: getLoadedStories(),
  loading: getLoadingState(),
  error: getLoadingError(),
  currentStory: getCurrentStory()
})

export function mapDispatchToProps(dispatch) {
  return {
    onLoadClick: () => {
      dispatch(loadStory())
      dispatch(hideLoadDialog())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadDialog)
