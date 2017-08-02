import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import StoryList from '../index'

describe('<StoryList />', () => {
  it('should render without crashing', () => {
    mountInProvider(<StoryList />)
  })
})
