/*
 *
 * ImportDialog actions
 *
 */

import {
  SET_VALID,
  SET_NAME,
  SET_FILE,
  IMPORT_STORY,
  RESET_DIALOG,
} from './constants'

export function setValid(filetype) {
  return {
    type: SET_VALID,
    filetype,
  }
}

export function setName(name) {
  return {
    type: SET_NAME,
    name,
  }
}

export function setFile(file) {
  return {
    type: SET_FILE,
    file,
  }
}

export function importStory(name, file) {
  return {
    type: IMPORT_STORY,
    name,
    file,
  }
}

export function resetDialog() {
  return {
    type: RESET_DIALOG,
  }
}
