import classnames from "classnames";
import { useContext, useEffect, useState } from "react";
import { MatrixTableContext, MatrixTableContextProvider } from "./context";

type Props = {
  initialMatrix?: import("../../types").Matrix;
} & import("react").HTMLAttributes<HTMLDivElement>;

/**
 * Add 4 buttons:
 * - Cancel to reset the matrix to how it was before changing the values (only when in edit mode)
 * - Edit to make the fields editable (only when not in edit mode)
 * - Clear to completely clear the table
 * - Save to save the table
 * @param param0
 */

const MatrixTable: import("react").FC<Omit<Props, "initialMatrix">> = ({
  className,
  children,
  ...props
}) => {
  // State ------------------------------------------------------------------- //
  const [{ matrix }, dispatch] = useContext(MatrixTableContext);

  // Handlers ---------------------------------------------------------------- //
  // You can save (to api) the matrix here. Remember to update originalMatrix when done.
  const save = async () => {
    console.log("save", matrix);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(matrix),
    };
    fetch("http://localhost:3000/api/save-pricing", requestOptions)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: "SET_ORIGINAL_MATRIX",
          payload: data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [disabled, setDisabled] = useState(true);
  function handleEditMode() {
    setDisabled(!disabled);
    if (!disabled) {
      dispatch({
        type: "SET_MATRIX",
        metadata: { resetToEmpty: false },
      });
    }
  }
  // Effects ----------------------------------------------------------------- //

  useEffect(function InitFunction() {
    async function fetchPrices() {
      await fetch("http://localhost:3000/api/pricing")
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: "INIT",
            payload: data,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    fetchPrices();
  }, []);

  // Rendering --------------------------------------------------------------- //
  return (
    <div className={classnames(["container", className])} {...props}>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>lite</th>
            <th>standard</th>
            <th>unlimited</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(matrix).map(name => (
            <tr key={name}>
              <td>{name}</td>

              {Object.keys(matrix[name]).map(type => (
                <td key={type}>
                  <input
                    name={name + "_" + type}
                    value={matrix[name][type]}
                    disabled={disabled}
                    onChange={e =>
                      dispatch({
                        type: "INPUT_ONCHANGE",
                        payload: { val: e.target.value, name: e.target.name },
                      })
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleEditMode}>{disabled ? "Edit" : "Cancel"}</button>
      <button disabled={disabled} onClick={save}>
        Save
      </button>
      <button
        disabled={disabled}
        onClick={() =>
          dispatch({
            type: "SET_MATRIX",
            metadata: { resetToEmpty: true },
          })
        }
      >
        Clear
      </button>
      <br />
      <br />
      36months lite:
      <input
        value={matrix["36months"].lite || ""}
        onChange={e =>
          dispatch({
            type: "INPUT_ONCHANGE",
            payload: e,
          })
        }
      />
      <style jsx>{`
        .container {
        }
      `}</style>
    </div>
  );
};

const MatrixTableWithContext: import("react").FC<Props> = ({
  initialMatrix,
  ...props
}) => {
  // You can fetch the pricing here or in pages/index.ts
  // Remember that you should try to reflect the state of pricing in originalMatrix.
  // matrix will hold the latest value (edited or same as originalMatrix)

  return (
    <MatrixTableContextProvider initialMatrix={initialMatrix}>
      <MatrixTable {...props} />
    </MatrixTableContextProvider>
  );
};

export default MatrixTableWithContext;
