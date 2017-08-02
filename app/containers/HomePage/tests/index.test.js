import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import HomePage from '../index'

describe('<HomePage />', () => {
  it('should render without crashing', () => {
    mountInProvider(<HomePage />)
  })
})
