import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import InvalidMessage from '../index'

describe('<InvalidMessage />', () => {
  it('should render without crashing', () => {
    mountInProvider(<InvalidMessage />)
  })
})
