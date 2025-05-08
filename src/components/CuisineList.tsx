import { useState } from "react";
import AddItemInput from "./AddItemInput";
import SelectableListItem from "./SelectableListItem";

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

  return (
    <>
      <div className="flex flex-col items-center h-full max-h-56 border-t border-amber-900 py-1">
        <ul className="flex flex-col items-center w-full h-full overflow-y-scroll">
          {cuisine.map((item, idx) =>
            <SelectableListItem
            key={idx}
            name={item.name}
            selected={item.selected}
            onToggle={() => handleCheckbox(idx)}
            onRemove={() => handleRemove(idx)}
          />
          )}
        </ul>
        <AddItemInput value={inputValue} onChange={handleInputChange} onAdd={() => handleItemAdd()} placeholder="Cuisine..."></AddItemInput>
      </div>
    </>
  );
};

export default CuisineList;
