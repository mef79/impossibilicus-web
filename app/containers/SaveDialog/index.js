/*
 *
 * SaveDialog
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Modal from 'react-modal'
import styled from 'styled-components'

import ModalHeader from 'components/ModalHeader'
import ModalClose from 'components/ModalClose'
import Button from 'components/Button'

import { getValid, getEnteredName } from './selectors'
import { getCurrentStory, getCurrentData, getSaveDialogVisibility, getCurrentName } from 'containers/HomePage/selectors'
import { getLoadedStories } from 'containers/LoadDialog/selectors'

import { changeStoryName, setValid, saveStory } from './actions'
import { hideSaveDialog } from 'containers/HomePage/actions'

const StoryNameInput = styled.input`
  display: block;
  background: #F5F5F5;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`

const modalStyle = {
  content: {
    height: '200px',
    width: '500px',
    top: '30%',
    left: '30%',
  }
}

export class SaveDialog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onChangeInput = evt => {
    this.props.onChangeStoryName(evt.target.value)
    this.props.onValidate(evt.target.value, this.props.existingStories.map(story => story.name))
  }
  render() {
    const canSaveNew = !!this.props.storyName && this.props.isValid
    return (
      <Modal isOpen={this.props.isOpen} contentLabel="Dialog" style={modalStyle}>
        <ModalHeader>Save Story</ModalHeader>
        <ModalClose onClick={this.props.close}>x</ModalClose>
        <StoryNameInput
          className={this.props.isValid ? '' : 'invalid'}
          onChange={this.onChangeInput}
        />
        <Button
          primary
          text="New Story"
          disabled={!canSaveNew}
          onClick={this.props.onSaveStory}
        />
      </Modal>
    )
  }
}

SaveDialog.propTypes = {
  close: PropTypes.func,
  save: PropTypes.func,
  currentStory: PropTypes.string,
  existingStories: PropTypes.object,
  isValid: PropTypes.bool,
  storyName: PropTypes.string,
  onChangeStoryName: PropTypes.func,
  onSaveStory: PropTypes.func,
  onValidate: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = createStructuredSelector({
  defaultValue: getCurrentStory(),
  existingStories: getLoadedStories(),
  isValid: getValid(),
  storyData: getCurrentData(),
  isOpen: getSaveDialogVisibility(),
  currentStory: getCurrentName(),
  storyName: getEnteredName(),
})

function mapDispatchToProps(dispatch) {
  return {
    onChangeStoryName: name => dispatch(changeStoryName(name)),
    onValidate: (name, existing) => dispatch(setValid(name, existing)),
    onSaveStory: () => dispatch(saveStory()),
    close: () => {
      dispatch(hideSaveDialog())
      dispatch(changeStoryName(null))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveDialog)
