import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { VariableDialog } from '../index'

describe('<VariableDialog />', () => {
  it('should render without crashing', () => {
    mountInProvider(<VariableDialog />)
  })

  it('Expect to have MORE unit tests specified', () => {
    expect(true).toEqual(false)
  })
})
