import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import TextInput from '../index'

describe('<TextInput />', () => {
  it('should render without crashing', () => {
    mountInProvider(<TextInput />)
  })
})
