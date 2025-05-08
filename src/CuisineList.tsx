import { useState } from "react";

interface Cuisine {
  selected: boolean;
  name: string;
}

type CuisineProps = {
  cuisine: Cuisine[];
  setCuisine: React.Dispatch<React.SetStateAction<Cuisine[]>>;
};

const CuisineList: React.FC<CuisineProps> = ({
  cuisine,
  setCuisine,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleItemAdd = () => {
    const updatedList = [...cuisine];
    updatedList.push({ selected: false, name: inputValue });
    setCuisine(updatedList);
    setInputValue("");
  };

  // update the list when we
  const handleCheckbox = (idx: number) => {
    const updatedList = [...cuisine];
    updatedList[idx] = {
      ...updatedList[idx],
      selected: !updatedList[idx].selected,
    };

    setCuisine(updatedList);
  };

  const handleRemove = (idx: number) => {
    let updatedList = [...cuisine];
    updatedList.splice(idx, 1);
    setCuisine(updatedList);
  };

  const mapListItemToHTML = (idx: number, selected: boolean, name: string) => {
    return (
      <li className="flex flex-row items-center" key={idx}>
        <input
          className="mx-2"
          type="checkbox"
          checked={selected}
          onChange={() => handleCheckbox(idx)}
        ></input>
        <p>{name}</p>
        <button
          className="text-gray-500 mx-2 hover:text-red-500"
          onClick={() => handleRemove(idx)}
        >
          Remove
        </button>
      </li>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center h-full max-h-56 border-1 border-black rounded-md">
        <ul className="flex flex-col items-center w-full h-full overflow-y-scroll">
          {cuisine.map((item, index) =>
            mapListItemToHTML(index, item.selected, item.name)
          )}
        </ul>
        <div>
          <input
            type="text"
            value={inputValue}
            placeholder="Cuisine..."
            onChange={handleInputChange}
          ></input>
          <button
            className="bg-amber-500 hover:bg-amber-200"
            onClick={() => handleItemAdd()}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default CuisineList;
