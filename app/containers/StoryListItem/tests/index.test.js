import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { StoryListItem } from '../index'

describe('<StoryListItem />', () => {
  it('should render without crashing', () => {
    mountInProvider(<StoryListItem item={{}} />)
  })
})
