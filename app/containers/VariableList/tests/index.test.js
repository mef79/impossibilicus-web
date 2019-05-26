import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { VariableList } from '../index'

describe('<VariableList />', () => {
  it('should render without crashing', () => {
    mountInProvider(<VariableList />)
  })

  it('Expect to have MORE unit tests specified', () => {
    expect(true).toEqual(false)
  })
})
