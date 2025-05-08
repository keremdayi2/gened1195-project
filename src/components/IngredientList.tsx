import { useState } from "react";

import AddItemInput from "./AddItemInput";
import SelectableListItem from "./SelectableListItem";

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
    updatedList.push({ selected: true, name: inputValue });
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

  return (
    <div className='my-2 flex flex-col items-center h-full max-h-56 border-t border-amber-900 py-1'>
      <ul className="flex flex-col items-center w-full h-full overflow-y-scroll">
        {ingredients.map((item, idx) =>
          <SelectableListItem
          key={idx}
          name={item.name}
          selected={item.selected}
          onToggle={() => handleCheckbox(idx)}
          onRemove={() => handleRemove(idx)}
        />
        )}
      </ul>
      <AddItemInput value={inputValue} onChange={handleInputChange} onAdd={() => handleItemAdd()} placeholder="Ingredient..."></AddItemInput>
    </div>
  );
};

export default IngredientList;
