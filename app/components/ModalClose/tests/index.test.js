import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import ModalClose from '../index'

describe('<ModalClose />', () => {
  it('should render without crashing', () => {
    mountInProvider(<ModalClose />)
  })
})
