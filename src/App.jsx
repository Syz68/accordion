import { useState } from "react";
import data from "./assets/data";

function App() {

  const [selected, setSelected] = useState(null)
  const [enablemultipleSelection, setEnableMultipleSelection] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])

  // const [statusOfMultipleSelection, setStatusOfMultipleSelection] = useState(false)

  

  function handleSingleSelection(getcurrentId) {
    setSelected(getcurrentId === selected ? null : getcurrentId);
  }

  function handlemultipleSelection(getcurrentId) {
    let copyMultiple = [...selectedItems]
    const indexOfCurrentId = copyMultiple.indexOf(getcurrentId)

    if (indexOfCurrentId === -1) {
      copyMultiple.push(getcurrentId)
    } else {
      copyMultiple.splice(indexOfCurrentId, 1)
    }

    setSelectedItems(copyMultiple)
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-600 text-center flex-col">

      <button
        className="p-4 bg-sky-400 font-bold rounded-md hover:bg-sky-500"
        onClick={() => setEnableMultipleSelection(!enablemultipleSelection)}
      >Enable Multiple Seleciton</button>

      <div className="w-1/2">
        <h1 className="text-3xl font-bold text-sky-300  m-5 underline"> Accordion </h1>
        {
          (data && data.length > 0) ? (
            data.map(dataItem => <div className="bg-sky-400 rounded-lg hover:bg-sky-500">

              <div
                onClick={enablemultipleSelection
                  ? () => handlemultipleSelection(dataItem.id)
                  : () => handleSingleSelection(dataItem.id)}

                className="gap-7 m-2 font-semibold flex justify-between items-center cursor-pointer p-4"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>

              {
                enablemultipleSelection ? selectedItems.indexOf(dataItem.id) !== -1 && (
                  <div className="bg-sky-300 h-auto text-center p-4">{dataItem.answer}</div>
                )
                  : selected === dataItem.id ?
                    <div className="bg-sky-300 h-auto text-center p-4">{dataItem.answer}</div>
                    : null
              }

            </div>))
            : (<div > No data found </div>)
        }
      </div>

    </div>
  );
}

export default App;
