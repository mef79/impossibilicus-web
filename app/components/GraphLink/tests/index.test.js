import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import GraphLink from '../index'

describe('<GraphLink />', () => {
  it('should render without crashing', () => {
    mountInProvider(<GraphLink />)
  })
})
