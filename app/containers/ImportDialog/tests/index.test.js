import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { ImportDialog } from '../index'

describe('<ImportDialog />', () => {
  it('should render without crashing', () => {
    mountInProvider(<ImportDialog />)
  })
})
