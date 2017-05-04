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
import ButtonGroup from 'components/ButtonGroup'

import { getValid, getStoryName } from './selectors'
import { getCurrentStory, getCurrentData, getSaveDialogVisibility } from 'containers/HomePage/selectors'
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
  constructor(props) {
    super(props)
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput(evt) {
    this.props.onChangeStoryName(evt.target.value)
    this.props.onValidate(evt.target.value, this.props.existingStories.map(story => story.name))
  }

  render() {
    const isCurrentStory = this.props.currentStory || false
    const canSaveNew = !isCurrentStory && !!this.props.storyName && this.props.isValid
    return (
      <Modal isOpen={this.props.isOpen} contentLabel="Dialog" style={modalStyle}>
        <ModalHeader>Save Story</ModalHeader>
        <ModalClose onClick={this.props.close}>x</ModalClose>
        <StoryNameInput
          className={this.props.isValid ? '' : 'invalid'}
          defaultValue={this.props.currentStory || ''}
          onChange={this.onChangeInput}
        />
        <ButtonGroup>
          <Button
            primary
            text="Update Story"
            disabled={!isCurrentStory}
            onClick={this.props.onSaveStory}
          />
          <Button
            primary
            text="New Story"
            disabled={!canSaveNew}
            onClick={this.props.onSaveStory}
          />
        </ButtonGroup>
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
  storyName: getStoryName(),
  storyData: getCurrentData(),
  isOpen: getSaveDialogVisibility(),
})

function mapDispatchToProps(dispatch) {
  return {
    onChangeStoryName: name => dispatch(changeStoryName(name)),
    onValidate: (name, existing) => dispatch(setValid(name, existing)),
    onSaveStory: () => dispatch(saveStory()),
    close: () => dispatch(hideSaveDialog()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveDialog)
