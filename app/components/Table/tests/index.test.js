import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import Table from '../index'

describe('<Table />', () => {
  it('should render without crashing', () => {
    mountInProvider(<Table />)
  })

  it('Expect to have unit MORE tests specified', () => {
    expect(true).toEqual(false)
  })
})
