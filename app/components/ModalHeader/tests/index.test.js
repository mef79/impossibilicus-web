import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import ModalHeader from '../index'

describe('<ModalHeader />', () => {
  it('should render without crashing', () => {
    mountInProvider(<ModalHeader />)
  })
})
