import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import Button from '../index'

describe('<Button />', () => {
  it('should render without crashing', () => {
    mountInProvider(<Button />)
  })
})
