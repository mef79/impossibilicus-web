import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Modal from 'react-modal'

import StoryList from 'containers/StoryList'
import ModalHeader from 'components/ModalHeader'
import ModalClose from 'components/ModalClose'
import Button from 'components/Button'

import { getLoadedStories, getLoadingState, getLoadingError } from './selectors'
import { getCurrentStory, getLoadDialogVisibility } from 'containers/HomePage/selectors'

import { loadStory, hideLoadDialog } from 'containers/HomePage/actions'

export class LoadDialog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Modal isOpen={this.props.isOpen} contentLabel="Dialog">
        <ModalHeader>Load Story</ModalHeader>
        <ModalClose onClick={this.props.close}>x</ModalClose>
        <StoryList stories={this.props.stories} />
        <Button
          primary
          onClick={this.props.onLoadClick}
          disabled={!!this.props.currentStory}
          text="Load"
        />
      </Modal>
    )
  }
}

LoadDialog.propTypes = {
  close: PropTypes.func.isRequired,
  stories: PropTypes.object,
  onLoadClick: PropTypes.func,
  currentStory: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = createStructuredSelector({
  stories: getLoadedStories(),
  loading: getLoadingState(),
  error: getLoadingError(),
  currentStory: getCurrentStory(),
  isOpen: getLoadDialogVisibility(),
})

export function mapDispatchToProps(dispatch) {
  return {
    onLoadClick: () => {
      dispatch(loadStory())
      dispatch(hideLoadDialog())
    },
    close: () => dispatch(hideLoadDialog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadDialog)
