import classnames from 'classnames'
import { useContext } from 'react'
import { MatrixTableContext, MatrixTableContextProvider } from './context'

type Props = {
  initialMatrix?: import('../../types').Matrix
} & import('react').HTMLAttributes<HTMLDivElement>

/**
 * Add 4 buttons: 
 * - Cancel to reset the matrix to how it was before changing the values (only when in edit mode)
 * - Edit to make the fields editable (only when not in edit mode)
 * - Clear to completely clear the table
 * - Save to save the table
 * @param param0 
 */
const MatrixTable: import('react').FC<Omit<Props, 'initialMatrix'>> = ({ className, children, ...props }) => {
  // State ------------------------------------------------------------------- //
  const [{ matrix }, dispatch] = useContext(MatrixTableContext)

  // Handlers ---------------------------------------------------------------- //
  // You can save (to api) the matrix here. Remember to update originalMatrix when done.
  const save = async () => {

  }

  // Effects ----------------------------------------------------------------- //

  // Rendering --------------------------------------------------------------- //
  return (
    <div className={classnames(['container', className])} {...props}>
      <button onClick={save}>Save</button>
      <br />
      <br />

      36months lite:
      <input 
        value={matrix["36months"].lite || ''} 
        onChange={(e) => dispatch({
          type: 'SOME_ACTION',
          payload: e.target.value
        })} />

      <style jsx>{`
        .container {
          
        }
      `}</style>
    </div>
  )
}

const MatrixTableWithContext: import('react').FC<Props> = ({ initialMatrix, ...props }) => {
  // You can fetch the pricing here or in pages/index.ts
  // Remember that you should try to reflect the state of pricing in originalMatrix.
  // matrix will hold the latest value (edited or same as originalMatrix)

  return (
    <MatrixTableContextProvider initialMatrix={initialMatrix}>
      <MatrixTable {...props} />
    </MatrixTableContextProvider>
  )
}

export default MatrixTableWithContext
