import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import Th from '../index'

describe('<Th />', () => {
  it('should render without crashing', () => {
    mountInProvider(<Th />)
  })

  it('Expect to have unit MORE tests specified', () => {
    expect(true).toEqual(false)
  })
})
