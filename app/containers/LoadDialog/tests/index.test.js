import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { LoadDialog } from '../index'

describe('<LoadDialog />', () => {
  it('should render without crashing', () => {
    mountInProvider(<LoadDialog close={() => {}} isOpen={true} />)
  })
})
