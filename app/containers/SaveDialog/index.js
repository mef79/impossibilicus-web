/*
 *
 * SaveDialog
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getValid, getStoryName } from './selectors'
import Modal from 'react-modal'
import ModalHeader from 'components/ModalHeader'
import ModalClose from 'components/ModalClose'
import styled from 'styled-components'
import { getCurrentStory } from 'containers/HomePage/selectors'
import TempButton from 'components/TempButton'
import { changeStoryName, setValid, saveStory } from './actions'
import { getLoadedStories } from 'containers/LoadDialog/selectors'

const StoryNameInput = styled.input`
  display: block;
  background: #F5F5F5;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%
`

const modalStyle = {
  content: {
    height: '200px',
    top: '30%'
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
    const existingNames = this.props.existingStories.map(story => story.name)
    return (
      <Modal isOpen={true} contentLabel="Dialog" style={modalStyle}>
        <ModalHeader>Save Story</ModalHeader>
        <ModalClose onClick={this.props.close}>x</ModalClose>
        <StoryNameInput
          className={this.props.isValid ? '' : 'invalid'}
          defaultValue={this.props.currentStory || ''}
          onChange={this.onChangeInput}
        />
        <TempButton
          buttonText="Update Story"
          isActive={isCurrentStory}
        />
        <TempButton
          buttonText="New Story"
          isActive={!isCurrentStory && !!this.props.storyName && this.props.isValid}
        />
      </Modal>
    )
  }
}

SaveDialog.propTypes = {
  close: PropTypes.func,
  save: PropTypes.func,
  currentStory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  existingStories: PropTypes.array,
  isValid: PropTypes.bool,
  storyName: PropTypes.string,
  onChangeStoryName: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  defaultValue: getCurrentStory(),
  existingStories: getLoadedStories(),
  isValid: getValid(),
  storyName: getStoryName()
})

function mapDispatchToProps(dispatch) {
  return {
    onChangeStoryName: (name) => dispatch(changeStoryName(name)),
    onValidate: (name, existing) => dispatch(setValid(name, existing)),
    // onSaveStory: (name, data) => dispatch(saveStory(name, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveDialog)
