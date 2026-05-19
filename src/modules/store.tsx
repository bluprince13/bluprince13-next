'use client'

import { createContext, useReducer } from 'react'

interface State {
    [key: string]: unknown
}

interface Action {
    type: string
    [key: string]: unknown
}

const initialState: State = {}
const store = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
    state: initialState,
    dispatch: () => undefined
})
const { Provider } = store

const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer((state: State, action: Action): State => {
        switch (action.type) {
            default:
                return state
        }
    }, initialState)
    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
