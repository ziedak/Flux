import { createContext, useReducer } from 'react'

/**
 * This is the state shape
 */
interface MatrixTableState {
  /**
   * This is the price matrix that contains the latest value
   */
  matrix: import('../../types').Matrix
  /**
   * We will use original matrix to help us "reset" the table when we want to cancel editing it.
   * Remember that **whenever** you get the matrix from the server, you must set originalMatrix
   * to that value; originalMatrix should try to mirror the matrix in our database.
   */
  originalMatrix: import('../../types').Matrix
}

/**
 * These are the types of the actions you can dispatch. Add actions you want to help you
 * type the dispatch function
 */
type MatrixAction = {
  type: 'SET_MATRIX',
  /**
   * When payload is empty, we will need to set the values from originalMatrix
   */ 
  payload?: import('../../types').Matrix
  metadata?: {
    /**
     * If this is set to true, then instead of resetting to the originalMatrix,
     * we reset to the emptyMatrix
     */
    resetToEmpty?: boolean
  }
} | {
  type: 'SET_ORIGINAL_MATRIX',
  /**
   * When empty, set the value from emptyMatrix
   */
  payload?: import('../../types').Matrix
} | {
  type: 'SOME_ACTION',
  payload: any
} // Here you will need to add your other action(s) in order to edit the pricing (remove SOME_ACTION).

/**
 * This is for the Provider component. No need to change.
 */
type ProviderProps = {
  initialMatrix?: import('../../types').Matrix
}

/**
 * This is an empty matrix. No need to change any value in here. The variable is read-only
 */
const emptyMatrix = {
  "36months": {
      "lite": 0,
      "standard": 0,
      "unlimited": 0,
  },
  "24months": {
      "lite": 0,
      "standard": 0,
      "unlimited": 0
  },
  "12months": {
      "lite": 0,
      "standard": 0,
      "unlimited": 0
  },
  "mtm": {
      "lite": 0,
      "standard": 0,
      "unlimited": 0
  }
} as const

/**
 * This is the default state we will start with. No need to change anything in here.
 */
const defaultState: MatrixTableState = {
  matrix: emptyMatrix,
  originalMatrix: emptyMatrix,
}

/**
 * Your reducer is here. This is a la Redux reducer, you simply take an action, then
 * you work on it and return the state.
 * 
 * @param state 
 * @param action 
 */
const reducer = (state: MatrixTableState, action: MatrixAction): MatrixTableState => {
  switch(action.type) {
    case 'SET_MATRIX':
      return {
        ...state,
      }
    case 'SET_ORIGINAL_MATRIX':
      return {
        ...state
      }
    default:
      return state
  }
}

// Creating the context, you don't need to change this.
export const MatrixTableContext = createContext<[MatrixTableState, import('react').Dispatch<MatrixAction>]>([defaultState, () => {}])

/**
 * This is the provider that hosts the state. You don't need to change this.
 * @param param0 
 */
export const MatrixTableContextProvider: import('react').FC<ProviderProps> = ({ initialMatrix, children }) => {
  const state = useReducer(reducer, { matrix: initialMatrix || emptyMatrix, originalMatrix: initialMatrix || emptyMatrix })

  return (
    <MatrixTableContext.Provider value={state}>
      {children}
    </MatrixTableContext.Provider>
  )
}