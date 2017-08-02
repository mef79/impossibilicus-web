import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import Story from '../index'

describe('<Story />', () => {
  it('should render without crashing', () => {
    mountInProvider(<Story />)
  })
})
