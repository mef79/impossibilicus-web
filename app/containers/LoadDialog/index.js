/*
 *
 * LoadDialog
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import makeSelectLoadDialog from './selectors'
import Modal from 'react-modal'
import ModalHeader from 'components/ModalHeader'
import ModalClose from 'components/ModalClose'
import StoryList from 'containers/StoryList'

export class LoadDialog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Modal isOpen={true} contentLabel="Dialog">
        <ModalHeader>Load Story</ModalHeader>
        <ModalClose onClick={this.props.close}>x</ModalClose>
        <StoryList items={[]} />
      </Modal>
    )
  }
}

LoadDialog.propTypes = {
  close: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  LoadDialog: makeSelectLoadDialog()
})

export default connect(mapStateToProps)(LoadDialog)
