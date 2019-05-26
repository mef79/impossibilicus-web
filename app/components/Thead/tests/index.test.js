import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import Thead from '../index'

describe('<Thead />', () => {
  it('should render without crashing', () => {
    mountInProvider(<Thead />)
  })

  it('Expect to have unit MORE tests specified', () => {
    expect(true).toEqual(false)
  })
})
