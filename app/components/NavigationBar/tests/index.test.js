import React from 'react'
import NavigationBar from '../index'
import { mountInProvider } from '../../../utils/test-utils'

describe('<NavigationBar />', () => {
  it('renders without crashing', () => {
    mountInProvider(<NavigationBar />)
  })
})
