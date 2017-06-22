/*
 *
 * ImportDialog
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Modal from 'react-modal'
import styled from 'styled-components'

import { getValid, getFile } from './selectors'
import { getImportDialogVisibility } from 'containers/HomePage/selectors'

import { setValid, setName, setFile, importStory, resetDialog } from './actions'
import { hideImportDialog } from 'containers/HomePage/actions'

import ModalHeader from 'components/ModalHeader'
import ModalClose from 'components/ModalClose'
import Button from 'components/Button'
import InvalidMessage from 'components/InvalidMessage'

const FileInput = styled.input`
  display: block;
  font-size: 16px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 5px;
  background: #F5F5F5;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const ImportButtons = styled.span`
  float: right
`

const modalStyle = {
  content: {
    height: '300px',
    width: '500px',
    top: '25%',
    left: '30%',
  }
}

export class ImportDialog extends React.PureComponent {
  onNameChange = evt => {
    const name = evt.target.value
    this.props.setName(name)
  }

  onFileChange = evt => {
    const file = evt.target.files[0]
    this.props.onValidate(file.type)
    this.props.setFile(file)
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} contentLabel="Dialog" style={modalStyle}>
        <ModalHeader>Import Story</ModalHeader>
        <ModalClose onClick={this.props.close}>x</ModalClose>
        <FileInput
          id="name-input"
          type="text"
          onChange={this.onNameChange}
        />
        <FileInput
          id="test-file-id"
          type="file"
          onChange={this.onFileChange}
          className={this.props.isValid ? '' : 'invalid'}
        />
        <InvalidMessage
          text="Invalid file type, please use plain text"
          isVisible={!this.props.isValid}
        />
        <ImportButtons>
          <Button
            primary
            text="Import"
            disabled={!this.props.isValid || !this.props.file}
            onClick={this.props.onImportClick}
          />
        </ImportButtons>
      </Modal>
    )
  }
}

ImportDialog.propTypes = {
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  onImportClick: PropTypes.func,
  onValidate: PropTypes.func,
  setName: PropTypes.func,
  setFile: PropTypes.func,
  file: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  isOpen: getImportDialogVisibility(),
  isValid: getValid(),
  file: getFile(),
})

function mapDispatchToProps(dispatch) {
  return {
    onImportClick: () => dispatch(importStory()),
    onValidate: filetype => dispatch(setValid(filetype)),
    setName: name => dispatch(setName(name)),
    setFile: file => dispatch(setFile(file)),
    close: () => {
      dispatch(resetDialog())
      dispatch(hideImportDialog())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportDialog)
