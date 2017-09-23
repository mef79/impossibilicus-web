import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { NodeForm } from '../index'

describe('<NodeForm />', () => {
  it('should render without crashing', () => {
    mountInProvider(<NodeForm />)
  })
})
