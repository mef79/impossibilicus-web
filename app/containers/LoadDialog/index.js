/*
 *
 * LoadDialog
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Modal from 'react-modal'
import ModalHeader from 'components/ModalHeader'
import ModalClose from 'components/ModalClose'
import StoryList from 'containers/StoryList'
import { makeSelectStories, makeSelectLoading, makeSelectError } from './selectors'

export class LoadDialog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Modal isOpen={true} contentLabel="Dialog">
        <ModalHeader>Load Story</ModalHeader>
        <ModalClose onClick={this.props.close}>x</ModalClose>
        <StoryList stories={this.props.stories} />
      </Modal>
    )
  }
}

LoadDialog.propTypes = {
  close: PropTypes.func.isRequired,
  stories: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
  stories: makeSelectStories(),
  loading: makeSelectLoading(),
  error: makeSelectError()
})

export default connect(mapStateToProps)(LoadDialog)

