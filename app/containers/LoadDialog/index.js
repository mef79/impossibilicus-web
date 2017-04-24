import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Modal from 'react-modal'

import StoryList from 'containers/StoryList'
import ModalHeader from 'components/ModalHeader'
import ModalClose from 'components/ModalClose'
import TempButton from 'components/TempButton'

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
        <TempButton
          onClickFunc={ this.props.onLoadClick }
          isActive={ !!this.props.currentStory }
          className="load"
          buttonText="Load"
        />
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
  ]),
  isOpen: PropTypes.bool.isRequired
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadDialog)
