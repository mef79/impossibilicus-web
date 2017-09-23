import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { FormPane } from '../index'

describe('<FormPane />', () => {
  it('should render without crashing', () => {
    mountInProvider(<FormPane />)
  })
})
