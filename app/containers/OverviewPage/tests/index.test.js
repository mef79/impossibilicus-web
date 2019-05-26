import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { OverviewPage } from '../index'

describe('<OverviewPage />', () => {
  it('should render without crashing', () => {
    mountInProvider(<OverviewPage />)
  })

  it('Expect to have MORE unit tests specified', () => {
    expect(true).toEqual(false)
  })
})
