import React from 'react'
// import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import { mountInProvider } from '../../../utils/test-utils'
import GATE_TYPES from '../../../utils/gatetypes'
import GateForm from '../index'

describe('<GateForm />', () => {
  it('should render without crashing', () => {
    mountInProvider(<GateForm gate={ fromJS({ gateType: GATE_TYPES.OPEN, id: 1 })} />)
  })
})
