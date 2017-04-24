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
import TempButton from 'components/TempButton'

import { getValid, getStoryName } from './selectors'
import { getCurrentStory, getCurrentData } from 'containers/HomePage/selectors'
import { getLoadedStories } from 'containers/LoadDialog/selectors'

import { changeStoryName, setValid, saveStory } from './actions'

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
          onClickFunc={this.props.onSaveStory}
        />
        <TempButton
          buttonText="New Story"
          isActive={!isCurrentStory && !!this.props.storyName && this.props.isValid}
          onClickFunc={this.props.onSaveStory}
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
  onSaveStory: PropTypes.func,
  onValidate: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  defaultValue: getCurrentStory(),
  existingStories: getLoadedStories(),
  isValid: getValid(),
  storyName: getStoryName(),
  storyData: getCurrentData(),
})

function mapDispatchToProps(dispatch) {
  return {
    onChangeStoryName: name => dispatch(changeStoryName(name)),
    onValidate: (name, existing) => dispatch(setValid(name, existing)),
    onSaveStory: () => dispatch(saveStory()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveDialog)
