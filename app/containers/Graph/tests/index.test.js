import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { Graph } from '../index'

describe('<Graph />', () => {
  it('should render without crashing', () => {
    mountInProvider(<Graph dimensions={{}} createDefaultStructure={() => {}} />)
  })
})

