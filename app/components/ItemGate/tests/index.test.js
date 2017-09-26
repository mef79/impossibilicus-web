import React from 'react'
// import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import { mountInProvider } from '../../../utils/test-utils'
import GATE_TYPES from '../../../utils/gatetypes'
import ItemGate from '../index'

describe('<ItemGate />', () => {
  it('should render without crashing', () => {
    mountInProvider(<ItemGate gate={ fromJS({ gateType: GATE_TYPES.ITEM, id: 1 }) } />)
  })
})
