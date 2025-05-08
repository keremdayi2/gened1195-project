import React from "react";
import { X } from "lucide-react";

type SelectableListItemProps = {
  name: string;
  selected: boolean;
  onToggle: () => void;
  onRemove: () => void;
};

const SelectableListItem: React.FC<SelectableListItemProps> = ({
  name,
  selected,
  onToggle,
  onRemove,
}) => {
  return (
    <li className="w-full flex flex-row items-center">
      <div className="flex flex-row items-center">
        <input
          className="h-5 w-5 accent-amber-500 cursor-pointer mx-2"
          type="checkbox"
          checked={selected}
          onChange={onToggle}
        />
        <p>{name}</p>
      </div>

      <button
        className="ml-auto text-gray-500 mx-2 hover:text-red-500"
        onClick={onRemove}
        aria-label="Remove"
      >
        <X size={14} />
      </button>
    </li>
  );
};

export default SelectableListItem;
