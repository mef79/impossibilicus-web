import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'

import { LinkForm } from '../index'

describe('<LinkForm />', () => {
  it('should render without crashing', () => {
    mountInProvider(<LinkForm />)
  })
})
