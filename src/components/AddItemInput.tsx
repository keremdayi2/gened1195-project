import React from "react";

type AddItemInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  placeholder?: string;
};

const AddItemInput: React.FC<AddItemInputProps> = ({
  value,
  onChange,
  onAdd,
  placeholder = "Ingredient...",
}) => {
  return (
    <div className='w-full flex flex-row items-center'>
      <div className="w-full border rounded-l px-2 h-7">
      <input
        type="text"
        className="w-full"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      </div>
      
      <button
        className="border bg-amber-300 hover:bg-amber-200 px-2 rounded-r h-7"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddItemInput;