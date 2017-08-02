import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import TextArea from '../index'

describe('<TextArea />', () => {
  it('should render without crashing', () => {
    mountInProvider(<TextArea />)
  })
})
