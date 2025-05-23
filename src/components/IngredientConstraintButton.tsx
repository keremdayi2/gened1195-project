type ConstraintProps = {
    strictIdx: number;
    setStrictIdx: React.Dispatch<React.SetStateAction<number>>;
  };

const idxToStrict : string[] = ['Strict', 'Include', 'Suggest'];
const idxToColor : string[] = ['text-red-700', 'text-blue-500', 'text-green-500'];
const numStates = idxToStrict.length;

const IngredientConstraintButton: React.FC<ConstraintProps> = ({strictIdx, setStrictIdx}) => {
    const handleClick = () => {
        const nextIdx = (strictIdx + 1) % numStates;
        setStrictIdx(nextIdx)
    }

    let label = idxToStrict[strictIdx];
    let bg = idxToColor[strictIdx];

    let classString = bg + ' ' + 'border-gray-700 hover:text-gray-900 rounded-md px-2 border-blue-500 min-w-24 mx-2';

    return (
        <button className={classString} onClick={handleClick}>
            {'Use ingredients: ' + label}
        </button>
    )
}


export default IngredientConstraintButton;
