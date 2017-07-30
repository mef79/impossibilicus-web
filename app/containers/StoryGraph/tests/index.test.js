import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { StoryGraph } from '../index'

describe('<StoryGraph />', () => {
  it('should render without crashing', () => {
    mountInProvider(<StoryGraph />)
  })
})
