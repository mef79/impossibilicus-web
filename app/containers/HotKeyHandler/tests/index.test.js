import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { HotKeyHandler } from '../index'

describe('<HotKeyHandler />', () => {
  it('should render without crashing', () => {
    mountInProvider(<HotKeyHandler />)
  })
})
