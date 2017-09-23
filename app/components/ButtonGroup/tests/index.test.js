import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import ButtonGroup from '../index'

describe('<ButtonGroup />', () => {
  it('should render without crashing', () => {
    mountInProvider(<ButtonGroup />)
  })
})
