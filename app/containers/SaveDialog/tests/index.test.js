import React from 'react'
// import { shallow } from 'enzyme'
import { mountInProvider } from '../../../utils/test-utils'
import { SaveDialog } from '../index'

describe('<SaveDialog />', () => {
  it('should render without crashing', () => {
    mountInProvider(<SaveDialog />)
  })
})
