import React from 'react'
// import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import { mountInProvider } from '../../../utils/test-utils'
import GATE_TYPES from '../../../utils/gatetypes'
import StatGate from '../index'

describe('<StatGate />', () => {
  it('should render without crashing', () => {
    mountInProvider(<StatGate gate={ fromJS({ gateType: GATE_TYPES.STAT, id: 1 }) } />)
  })
})
