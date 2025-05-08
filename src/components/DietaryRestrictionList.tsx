import { useState } from "react";
import AddItemInput from "./AddItemInput";
import SelectableListItem from "./SelectableListItem";

interface DietaryRestriction {
  selected: boolean;
  name: string;
}

type DietaryRestrictionProps = {
  restrictions: DietaryRestriction[];
  setRestrictions: React.Dispatch<React.SetStateAction<DietaryRestriction[]>>;
};

const DietaryRestrictionList: React.FC<DietaryRestrictionProps> = ({
  restrictions,
  setRestrictions,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleItemAdd = () => {
    const updatedList = [...restrictions];
    updatedList.push({ selected: true, name: inputValue });
    setRestrictions(updatedList);
    setInputValue("");
  };

  // update the list when we
  const handleCheckbox = (idx: number) => {
    const updatedList = [...restrictions];
    updatedList[idx] = {
      ...updatedList[idx],
      selected: !updatedList[idx].selected,
    };

    setRestrictions(updatedList);
  };

  const handleRemove = (idx: number) => {
    let updatedList = [...restrictions];
    updatedList.splice(idx, 1);
    setRestrictions(updatedList);
  };

  return (
    <>
      <div className="my-2 flex flex-col items-center h-full max-h-56 border-t border-amber-900 py-1">
        <ul className="flex flex-col items-center w-full h-full overflow-y-scroll">
          {restrictions.map((item, idx) =>
            <SelectableListItem
            key={idx}
            name={item.name}
            selected={item.selected}
            onToggle={() => handleCheckbox(idx)}
            onRemove={() => handleRemove(idx)}
          />
          )}
        </ul>
        <AddItemInput value={inputValue} onChange={handleInputChange} onAdd={() => handleItemAdd()} placeholder="Dietary Restriction..."></AddItemInput>
      </div>
    </>
  );
};

export default DietaryRestrictionList;
