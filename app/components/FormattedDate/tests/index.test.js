import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import FormattedDate from '../index'

describe('<FormattedDate />', () => {
  it('should render without crashing', () => {
    mountInProvider(<FormattedDate />)
  })
})
