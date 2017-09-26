import React from 'react'
// import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import { mountInProvider } from '../../../utils/test-utils'
import GATE_TYPES from '../../../utils/gatetypes'
import HistoryGate from '../index'

describe('<HistoryGate />', () => {
  it('should render without crashing', () => {
    mountInProvider(<HistoryGate gate={ fromJS({ gateType: GATE_TYPES.HISTORY, id: 1 }) } />)
  })
})
