import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

export function mockFormStore(initialState = {}) {
  const store = createStore((state = initialState) => Object.assign({}, state))
  return store
}

export function mountInProvider(component) {
  return (
    <Provider store={mockFormStore()}>
      { component }
    </Provider>)
}
