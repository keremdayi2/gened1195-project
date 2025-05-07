import { useState } from "react";

const defaultList = [
  { selected: true, name: "Eggs" },
  { selected: false, name: "Bread" },
];

const IngredientList = () => {
  const [ingredientList, setIngredientList] = useState(defaultList);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleItemAdd = () => {
    ingredientList.push({ selected: false, name: inputValue });
    setInputValue("");
  };

  // update the list when we
  const handleCheckbox = (idx: number) => {
    const updatedList = [...ingredientList];
    updatedList[idx] = {
      ...updatedList[idx],
      selected: !updatedList[idx].selected,
    };

    setIngredientList(updatedList);
  };

  const handleRemove = (idx : number) => {
    let updatedList = [...ingredientList];
    updatedList.splice(idx, 1);
    setIngredientList(updatedList);
  };

  const mapListItemToHTML = (idx: number, selected: boolean, name: string) => {
    return (
      <li className="flex flex-row items-center">
        <input
          className="mx-2"
          type="checkbox"
          checked={ingredientList[idx].selected}
          onChange={() => handleCheckbox(idx)}
        ></input>
        <p>{name}</p>
        <button className='text-gray-500 mx-2 hover:text-red-500' onClick={() => handleRemove(idx)}>Remove</button>
      </li>
    );
  };

  return (
    <div className='flex flex-col items-center h-full max-h-44 border-1 border-black rounded-md'>
      <ul className="flex flex-col items-center w-full h-full overflow-y-scroll">
        {ingredientList.map((item, index) =>
          mapListItemToHTML(index, item.selected, item.name)
        )}
      </ul>
      <div>
        <input
          type="text"
          value={inputValue}
          placeholder="Ingredient..."
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
  );
};

export default IngredientList;
