import { useState } from "react";

interface Ingredient {
  selected: boolean;
  name: string;
}

type IngredientListProps = {
    ingredients: Ingredient[];
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  };

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, setIngredients }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleItemAdd = () => {
    const updatedList = [...ingredients];
    updatedList.push({ selected: false, name: inputValue });
    setIngredients(updatedList);
    setInputValue("");
  };

  // update the list when we
  const handleCheckbox = (idx: number) => {
    const updatedList = [...ingredients];
    updatedList[idx] = {
      ...updatedList[idx],
      selected: !updatedList[idx].selected,
    };

    setIngredients(updatedList);
  };

  const handleRemove = (idx : number) => {
    let updatedList = [...ingredients];
    updatedList.splice(idx, 1);
    setIngredients(updatedList);
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
        <button className='text-gray-500 mx-2 hover:text-red-500' onClick={() => handleRemove(idx)}>Remove</button>
      </li>
    );
  };

  return (
    <div className='flex flex-col items-center h-full max-h-56 border-1 border-black rounded-md'>
      <ul className="flex flex-col items-center w-full h-full overflow-y-scroll">
        {ingredients.map((item, index) =>
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
