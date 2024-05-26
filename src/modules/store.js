'use client'

import { createContext, useReducer } from 'react'

const initialState = {}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
    // eslint-disable-next-line no-shadow
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            default:
                throw new Error()
        }
    }, initialState)
    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
