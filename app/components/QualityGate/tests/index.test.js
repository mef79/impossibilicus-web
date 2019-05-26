import React from 'react'
// import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import { mountInProvider } from '../../../utils/test-utils'
import GATE_TYPES from '../../../utils/gatetypes'
import QualityGate from '../index'

describe('<QualityGate />', () => {
  it('should render without crashing', () => {
    mountInProvider(<QualityGate gate={ fromJS({ gateType: GATE_TYPES.QUALITY, id: 1 }) } />)
  })
})
