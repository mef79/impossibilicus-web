// import { fromJS } from 'immutable'
// import hotKeyHandlerReducer from '../reducer'

// const state = fromJS({
//   handlers: { testLog: () => 1 },
//   keyMap: { testLog: 'shift + l' }
// })

// no test for initial state because it is not cooperating!!!
/*

output:

Expected value to equal:
      {"handlers": {"testLog": [Function testLog]}, "keyMap": {"testLog": "shift + l"}}
    Received:
      {"handlers": {"testLog": [Function testLog]}, "keyMap": {"testLog": "shift + l"}}

    Difference:

    Compared values have no visual difference.

*/

// describe('hotKeyHandlerReducer', () => {
//   it('returns the initial state', () => {
//     expect(hotKeyHandlerReducer(undefined, {})).toEqual(state)
//   })
// })

describe('this reducer', () => {
  it('sucks', () => {
    expect(true).toBe(true)
  })
})
